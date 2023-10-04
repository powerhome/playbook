# frozen_string_literal: true

module Playbook
  module PbDocHelper
    def pb_kit_title(title)
      title.remove("pb_").titleize.tr("_", " ")
    end

    def pb_kit(kit: "", type: "rails", show_code: true, limit_examples: false, dark_mode: false)
      examples = pb_doc_kit_examples(kit, type)
      examples = examples.first(1) if limit_examples
      examples.map do |example|
        pb_rails "docs/kit_example", props: {
          kit: kit,
          example_title: example.values.first,
          example_key: example.keys.first,
          show_code: show_code,
          type: type,
          dark: dark_mode,
        }
      end.join.yield_self(&method(:raw))
    end

    def nav_hash_array(link)
      link.first.last
    end

    # Deal with lists of kits, used in Playbook doc and Externally
    def pb_kits(type: "rails", limit_examples: false, dark_mode: false)
      kits = get_kits(type)

      # Iterate through the filtered kits and render them
      kits.map do |kit|
        render_pb_doc_kit(kit["name"], type, limit_examples, true, dark_mode)
      end.join.html_safe
    end

    def get_kits(type = "rails")
      kits = YAML.load_file(Playbook::Engine.root.join("dist/menu.yml")) || []

      # Filter kits that have at least one component compatible with the type
      kits["kits"].select do |kit|
        kit["components"].any? { |component| component["platforms"].include?(type) }
      end
    end

    def aggregate_kits
      all_kits = []

      YAML.load_file(Playbook::Engine.root.join("dist/menu.yml"))["kits"].each do |kit|
        kit_name = kit["name"]
        components = kit["components"].map { |c| c["name"] }

        all_kits << if components.size == 1
                      components.first
                    else
                      { kit_name => components }
                    end
      end

      all_kits
    end

    # rubocop:disable Style/OptionalBooleanParameter
    def render_pb_doc_kit(kit_name, type, limit_examples, code = true, dark_mode = false)
      parent_kit = YAML.load_file(Playbook::Engine.root.join("dist/menu.yml"))["kits"].find { |kit| kit["name"] == kit_name }

      # Initialize component_content as an empty string
      component_content = ""

      # Check if parent_kit is not nil
      if parent_kit
        # Filter components based on the specified type
        components = parent_kit["components"].select { |component| component["platforms"].include?(type) }

        # If it's a parent with components, accumulate the UI content for child components
        if components.any?
          component_content = components.map do |component|
            component_name = component["name"]
            title = pb_doc_render_clickable_title(component_name, type) # Use component_name for the title

            # Render the component UI content with the same styles/tags as the parent
            component_ui = raw("<div class='pb--docItem-ui'>
              #{pb_kit(kit: component_name, type: type, show_code: code, limit_examples: limit_examples, dark_mode: dark_mode)}
            </div>")

            # Combine the component name and component UI content
            "#{title}#{component_ui}"
          end.join.to_s
        end
      end

      # Combine the component content and UI content for the parent kit
      component_content.to_s.to_s
    end
  # rubocop:enable Style/OptionalBooleanParameter

  private

    def pb_doc_kit_path(kit, *args)
      Playbook.kit_path(kit, "docs", *args)
    end

    def pb_doc_kit_examples(kit, type)
      example_file = pb_doc_kit_path(kit, "example.yml")
      if File.exist?(example_file)
        examples_list = YAML.load_file(example_file)
                            .inject({}) { |item, (k, v)| item[k.to_sym] = v; item }
        examples_list.dig(:examples, type) || []
      else
        []
      end
    end

    def pb_doc_render_clickable_title(kit, type)
      url = "#"
      begin
        url = case type
              when "react"
                kit_show_reacts_path(kit)
              when "swift"
                kit_show_swift_path(kit)
              else
                kit_show_path(kit)
              end
      # FIXME: this is here because this helper generates a link for playbook website,
      #       but shouldn't do anything when used elsewhere
      rescue
        puts "Kit Path Not Avaliable"
      end
      render inline: "<a href='#{url}'>#{pb_rails(:title, props: { text: pb_kit_title(kit), tag: 'h3', size: 2 })}</a>"
    end
  end
end
