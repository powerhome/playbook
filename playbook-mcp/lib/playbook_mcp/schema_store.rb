# frozen_string_literal: true

require "json"

module PlaybookMcp
  class SchemaStore
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

  private

    def preload!
      kit_ids.each do |id|
        relative = index.dig("schemas", "kits", id)
        raise ValidationError, "Unknown kit: #{id}" unless relative

        @kit_schemas[id] = load_json(relative)
        path = @ai_root.join("playgrounds", "#{id}.json")
        @playgrounds[id] = path.file? ? JSON.parse(path.read) : nil
      end
    end

    def load_json(relative)
      path = @ai_root.join(relative)
      raise ValidationError, "Missing AI metadata: #{relative}" unless path.file?

      JSON.parse(path.read)
    end
  end
end
