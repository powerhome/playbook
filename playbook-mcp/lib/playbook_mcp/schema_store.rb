# frozen_string_literal: true

require "json"

module PlaybookMcp
  class SchemaStore
    def self.instance
      @instance ||= new
    end

    def initialize(ai_root: Playbook::Engine.root.join("dist/ai"))
      @ai_root = Pathname(ai_root)
      @index = load_json("index.json")
      @global_props = load_json("global-props.schema.json")
      @kit_schemas = {}
      @playgrounds = {}
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
      @kit_schemas[kit] ||= begin
        relative = index.dig("schemas", "kits", kit)
        raise ValidationError, "Unknown kit: #{kit}" unless relative

        load_json(relative)
      end
    end

    def playground_for(kit)
      kit = kit.to_s
      return @playgrounds[kit] if @playgrounds.key?(kit)

      path = @ai_root.join("playgrounds", "#{kit}.json")
      @playgrounds[kit] = path.file? ? JSON.parse(path.read) : nil
    end

    def rails_kit?(kit)
      schema = schema_for(kit)
      platforms = schema["platforms"] || []
      platforms.include?("rails")
    rescue ValidationError
      false
    end

  private

    def load_json(relative)
      path = @ai_root.join(relative)
      raise ValidationError, "Missing AI metadata: #{relative}" unless path.file?

      JSON.parse(path.read)
    end
  end
end
