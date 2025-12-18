# frozen_string_literal: true

module PlaybookWebsite
  module PbDocHelper
    def pb_kit_title(title)
      highcharts_kits = %w[pb_bar_graph pb_circle_chart pb_line_graph pb_gauge_chart]
      return "PB #{title.sub(/^pb_/, '').tr('_', ' ').titleize}" if highcharts_kits.include?(title)

      title.remove("pb_").titleize.tr("_", " ")
    end

    def pb_kit(kit: "", type: "rails", show_code: true, limit_examples: false, dark_mode: false, variants: [], kit_section: [])
      examples = pb_doc_kit_examples(kit, type) || []
      examples.select! { |elem| variants.any? { |variant| elem.key?(variant) } } unless variants.empty?
      unless kit_section.empty?
        examples.select! do |example|
          example_title = example.values.first
          kit_section.any? { |title| example_title.include?(title) }
        end
      end

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
    def pb_kits(type: "rails", limit_examples: false, dark_mode: false, method: get_kits)
      display_kits = []
      kits = method
      kits.each do |kit|
        if kit.is_a?(Hash)
          nav_hash_array(kit).each do |sub_kit|
            # Get platform-specific status or fall back to kit-level status
            kit_status = get_kit_status_for_platform(sub_kit, type)
            display_kits << render_pb_doc_kit(sub_kit[:name], type, limit_examples, false, dark_mode) if kit_status != "beta" && pb_doc_has_kit_type?(sub_kit[:name], type)
          end
        elsif pb_doc_has_kit_type?(kit, type)
          display_kits << render_pb_doc_kit(kit, type, limit_examples, false, dark_mode)
        end
      end
      raw("<div class='pb--docItem'>" + display_kits.join("</div><div class='pb--docItem'>") + "</div>")
    end
    # rubocop:enable Style/StringConcatenation

    # rubocop:disable Naming/AccessorMethodName
    def get_kits(_type = "rails")
      aggregate_kits_with_status || []
    end

    def get_kits_pb_website
      menu = YAML.load_file(Rails.root.join("config/menu.yml"))
      menu["kits"]
    end
    # rubocop:enable Naming/AccessorMethodName

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

    # Get the status for a specific platform
    # Falls back to kit-level status if platform-specific status is not defined
    def get_kit_status_for_platform(kit, platform)
      platforms_status = kit[:platforms_status] || kit["platforms_status"]

      if platforms_status && platforms_status[platform.to_s]
        platforms_status[platform.to_s]
      elsif platforms_status && platforms_status[platform.to_sym]
        platforms_status[platform.to_sym]
      else
        kit[:status] || kit["status"]
      end
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
