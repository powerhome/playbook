# frozen_string_literal: true

module PlaybookMcp
  module IconCatalog
  module_function

    def available?
      Rails.application.config.respond_to?(:icon_path) &&
        Rails.application.config.icon_path.present? &&
        Dir.exist?(Rails.root.join(Rails.application.config.icon_path))
    end

    def names
      return [] unless available?

      Playbook::PbIcon::Icon.icon_path_index.keys.sort
    end

    def aliases
      return {} unless available? && Rails.application.config.respond_to?(:icon_alias_path)

      Playbook::PbIcon::Icon.icon_alias_map || {}
    end

    def search(query = nil, limit: 100)
      q = query.to_s.strip.downcase
      list = names
      list = list.select { |name| name.include?(q) } if q.present?
      {
        count: list.size,
        icons: list.first(limit),
        truncated: list.size > limit,
        aliases: q.present? ? aliases.select { |k, _| k.to_s.include?(q) } : {},
      }
    end
  end
end
