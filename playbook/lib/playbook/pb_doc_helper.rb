# frozen_string_literal: true

module Playbook
  module PbDocHelper
    def pb_kit_title(title)
      highcharts_kits = %w[pb_bar_graph pb_circle_chart pb_line_graph pb_gauge_chart]
      return "PB #{title.sub(/^pb_/, '').tr('_', ' ').titleize}" if highcharts_kits.include?(title)

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
    def pb_kits(type: "rails", limit_examples: false, dark_mode: false, method: get_kits)
      display_kits = []
      kits = method
      kits.each do |kit|
        if kit.is_a?(Hash)
          nav_hash_array(kit).each do |sub_kit|
            display_kits << render_pb_doc_kit(sub_kit, type, limit_examples, false, dark_mode)
          end
        else
          display_kits << render_pb_doc_kit(kit, type, limit_examples, false, dark_mode)
        end
      end
      raw("<div class='pb--docItem'>" + display_kits.join("</div><div class='pb--docItem'>") + "</div>")
    end
    # rubocop:enable Style/StringConcatenation

    # rubocop:disable Naming/AccessorMethodName
    def get_kits
      menu = ActiveSupport::ConfigurationFile.parse(Playbook::Engine.root.join("dist/menu.yml"))
      all_kits = []
      menu["kits"].each do |kit|
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

    def get_kits_pb_website
      menu = ActiveSupport::ConfigurationFile.parse(Rails.root.join("config/menu.yml"))
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

    def pb_doc_kit_examples(kit, type)
      example_file = pb_doc_kit_path(kit, "example.yml")
      if File.exist?(example_file)
        ActiveSupport::ConfigurationFile.parse(example_file)
                                        .transform_keys(&:to_sym)
                                        .dig(:examples, type) || []
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
