# frozen_string_literal: true

module PlaybookMcp
  # Agents often pass Font Awesome / colloquial icon names that are not in
  # @powerhome/playbook-icons. Playbook then falls back to empty <i class="fa-…">
  # (no webfont in MCP docs) — looks like a colored circle with no glyph.
  # Rewrite icon props to real catalog ids before pb_rails. MCP-only; no Playbook changes.
  module IconResolver
    # Common LLM / FA names → playbook-icons ids (when alias map does not cover them).
    REMAPS = {
      "percentage" => "percent",
      "mail" => "envelope",
      "email" => "envelope",
      "settings" => "cog",
      "trending-up" => "chart-line-up",
      "trending-down" => "chart-line-down",
      "trend-up" => "chart-line-up",
      "trend-down" => "chart-line-down",
      "revenue" => "chart-line",
      "conversion" => "percent",
      "aov" => "cart-shopping",
      "kpi" => "chart-bar",
      "fa-chart-line" => "chart-line",
      "fa-users" => "users",
      "fa-user" => "user",
      "fa-dollar" => "currency-dollar",
      "fa-dollar-sign" => "currency-dollar",
    }.freeze

    DEFAULT_ICON = "circle-info"

    class << self
      def apply(props)
        return props unless IconCatalog.available?

        walk(props)
      end

      def resolve(name)
        return name if name.nil? || !name.is_a?(String) || name.strip.empty?
        return name unless IconCatalog.available?

        normalized = normalize(name)
        return normalized if known?(normalized)

        remapped = REMAPS[normalized]
        return remapped if remapped && known?(remapped)

        aliased = resolve_alias(normalized)
        return aliased if aliased && known?(aliased)

        fuzzy = fuzzy_match(normalized)
        return fuzzy if fuzzy

        DEFAULT_ICON
      end

    private

      def walk(value)
        case value
        when Hash
          value.each_with_object({}) do |(key, child), memo|
            key_s = key.to_s
            memo[key] = if key_s == "icon" && child.is_a?(String)
                          resolve(child)
                        else
                          walk(child)
                        end
          end
        when Array
          value.map { |child| walk(child) }
        else
          value
        end
      end

      def normalize(name)
        name.to_s.strip.downcase
            .gsub(/\Afa[srbk]?\s+/, "")
            .sub(/\Afa-/, "")
            .tr("_", "-")
            .gsub(/\s+/, "-")
      end

      def known?(name)
        IconCatalog.names.include?(name)
      end

      def resolve_alias(name)
        aliases = IconCatalog.aliases[name]
        return nil unless aliases

        if aliases.is_a?(Array)
          aliases.find { |candidate| known?(candidate) }
        else
          aliases.to_s
        end
      end

      def fuzzy_match(name)
        catalog = IconCatalog.names
        tokens = name.split("-").reject { |t| t.length < 2 }
        return nil if tokens.empty?

        hit = catalog.find { |n| tokens.all? { |t| n.include?(t) } }
        return hit if hit

        catalog.find { |n| name.include?(n) && n.length >= 3 } ||
          catalog.find { |n| n.include?(name) && name.length >= 3 }
      end
    end
  end
end
