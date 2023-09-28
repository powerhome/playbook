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
    # rubocop:disable Style/StringConcatenation
    def pb_kits(type: "rails", limit_examples: false, dark_mode: false)
      display_kits = []
      kits = get_kits(type)
      kits.each do |kit|
        nav_array = nav_hash_array(kit)
        next unless nav_array.is_a?(Array)

        nav_array.each do |sub_kit|
          display_kits << render_pb_doc_kit(sub_kit, type, limit_examples, false, dark_mode)
        end
      end
      raw("<div class='pb--docItem'>" + display_kits.join("</div><div class='pb--docItem'>") + "</div>")
    end
    # rubocop:enable Style/StringConcatenation

    def get_kits(type = "rails")
      menu = YAML.load_file(Playbook::Engine.root.join("dist/menu.yml"))
      menu["kits"][type]
    end

    def aggregate_kits
      menu = YAML.load_file(Playbook::Engine.root.join("dist/menu.yml"))
      all_kits = []

      # Loop over each type (rails, react, swift, etc.)
      menu["kits"].each do |_type, kits|
        kits.each do |kit|
          case kit
          when Hash
            kit_name = kit.keys.first
            existing_kit = all_kits.find { |k| k.is_a?(Hash) && k.keys.first == kit_name }

            if existing_kit
              existing_kit[kit_name] += kit[kit_name] unless kit[kit_name].nil?
              existing_kit[kit_name].uniq!
              existing_kit[kit_name].sort!
            else
              all_kits << { kit_name => kit[kit_name] }
            end
          when String
            all_kits << kit unless all_kits.include?(kit)
          end
        end
      end

      # Sort the top-level entries
      all_kits.sort_by! do |kit|
        kit.is_a?(Hash) ? kit.keys.first : kit
      end

      all_kits
    end

    # rubocop:disable Style/OptionalBooleanParameter
    def render_pb_doc_kit(kit, type, limit_examples, code = true, dark_mode = false)
      title = pb_doc_render_clickable_title(kit, type)
      ui = raw("<div class='pb--docItem-ui'>
          #{pb_kit(kit: kit, type: type, show_code: code, limit_examples: limit_examples, dark_mode: dark_mode)}</div>")
      title + ui
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
