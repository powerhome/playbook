# frozen_string_literal: true

require "json"

module PlaybookMcp
  class SchemaStore
    CHART_PACKAGES = %w[highcharts highcharts-react-official].freeze
    @mutex = Mutex.new

    def self.instance
      return @instance if @instance

      @mutex.synchronize { @instance ||= new }
    end

    def initialize(ai_root: Playbook::Engine.root.join("dist/ai"))
      @ai_root = Pathname(ai_root)
      @index = load_json("index.json")
      @global_props = load_json("global-props.schema.json")
      @kit_schemas = {}
      @playgrounds = {}
      preload!
      # Read-only after boot so Puma threads never Hash#[]= these caches.
      @kit_schemas.freeze
      @playgrounds.freeze
      @chart_kit_ids.freeze
    end

    attr_reader :index, :global_props

    def kit_ids
      (index.dig("schemas", "kits") || {}).keys.sort
    end

    def kit_meta
      index["kitMeta"] || {}
    end

    def schema_for(kit)
      kit = kit.to_s
      @kit_schemas.fetch(kit) { raise ValidationError, "Unknown kit: #{kit}" }
    end

    def playground_for(kit)
      @playgrounds[kit.to_s]
    end

    def rails_kit?(kit)
      schema = schema_for(kit)
      platforms = schema["platforms"] || []
      platforms.include?("rails")
    rescue ValidationError
      false
    end

    def chart_kit?(kit)
      @chart_kit_ids.include?(kit.to_s)
    end

    # Highcharts kits ship `playbook-ui/charts` imports, a charts_import hint,
    # and/or highcharts peer packages — not a hardcoded kit-id list.
    def self.chart_metadata?(schema: nil, playground: nil, kit_meta: nil)
      schema ||= {}
      playground ||= {}
      kit_meta ||= {}

      imports = Array(playground["externalImports"]) + Array(schema["externalImports"])
      return true if imports.any? { |line| line.to_s.include?("playbook-ui/charts") }

      hints = playground["hints"]
      return true if hints.is_a?(Hash) && hints.key?("charts_import")

      packages = []
      [schema, playground, kit_meta].each do |src|
        deps = src["externalDependencies"]
        next unless deps.is_a?(Hash)

        packages.concat(Array(deps["packages"]))
      end
      packages.any? { |pkg| CHART_PACKAGES.include?(pkg.to_s) }
    end

  private

    def preload!
      @chart_kit_ids = []
      kit_ids.each do |id|
        relative = index.dig("schemas", "kits", id)
        raise ValidationError, "Unknown kit: #{id}" unless relative

        @kit_schemas[id] = load_json(relative)
        path = @ai_root.join("playgrounds", "#{id}.json")
        @playgrounds[id] = path.file? ? JSON.parse(path.read) : nil
        next unless self.class.chart_metadata?(
          schema: @kit_schemas[id],
          playground: @playgrounds[id],
          kit_meta: kit_meta[id]
        )

        @chart_kit_ids << id
      end
    end

    def load_json(relative)
      path = @ai_root.join(relative)
      raise ValidationError, "Missing AI metadata: #{relative}" unless path.file?

      JSON.parse(path.read)
    end
  end
end
