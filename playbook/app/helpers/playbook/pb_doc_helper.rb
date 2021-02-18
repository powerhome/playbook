# frozen_string_literal: true

module Playbook
  module PbDocHelper
    def pb_kit_title(title)
      title.remove("pb_").titleize.tr("_", " ")
    end

    def pb_doc_source(type, kit, example_key)
      highlight = type == "react" ? "react" : "erb"
      extension = type == "react" ? "jsx" : "html.erb"
      source = read_source_file kit_path(kit).join("docs/_#{example_key}.#{extension}")
      raw rouge(source, highlight)
    end

    def pb_doc_example(type, kit, example_key)
      if type == "rails"
        render file: kit_path(kit).join("docs/_#{example_key}.html.erb")
      elsif type == "react"
        pb_react(example_key.camelize)
      end
    end

    def pb_doc_kit_api(kit)
      kit_class = Playbook::KitResolver.resolve(kit.to_s)
      return unless kit_class
      render partial: "playbook/config/pb_kit_api", locals: { kit_api: kit_class.props.keys }
    end

    def has_kit_type?(kit, type)
      type ||= "rails"
      if type == "rails"
        erbfiles = File.join("**", "*.erb")
        Dir.glob(erbfiles, base: "#{kit_path(kit)}/docs").present?
      elsif type == "react"
        jsxfiles = File.join("**", "*.jsx")
        Dir.glob(jsxfiles, base: "#{kit_path(kit)}/docs").present?
      end
    end

    def get_kit_description(kit)
      read_source_file kit_path(kit).join("docs/_description.md")
    end

    def get_per_sample_descriptions(kit, key)
      read_source_file kit_path(kit).join("docs/_#{key}.md")
    end

    def get_kit_footer(kit)
      read_source_file kit_path(kit).join("docs/_footer.md")
    end

    def pb_kit(kit: "", type: "rails", show_code: true, limit_examples: false)
      @type = type
      @kit_examples = get_kit_examples(kit, type)
      @limit_examples = limit_examples
      @show_code = show_code
      render partial: "playbook/config/kit_example"
    end

    def pb_kits(type: "rails", limit_examples: false)
      display_kits = []
      kits = get_kits
      kits.each do |kit|
        if kit.is_a?(Hash)
          nav_hash_array(kit).each do |sub_kit|
            display_kits << render_pb_doc_kit(sub_kit, type, false, limit_examples)
          end
        else
          display_kits << render_pb_doc_kit(kit, type, false, limit_examples)
        end
      end
      raw("<div class='pb--docItem'>" + display_kits.join("</div><div class='pb--docItem'>") + "</div>")
    end

    def get_kits
      menu = YAML.load_file("#{Playbook::Engine.root}/app/pb_kits/playbook/data/menu.yml")
      menu["kits"]
    end

    def pb_category_kits(category_kits: [], type: "rails")
      display_kits = []
      category_kits.each do |kit|
        display_kits << render_pb_doc_kit(kit, type, false)
      end
      raw("<div class='pb--docItem'>" + display_kits.join("</div><div class='pb--docItem'>") + "</div>")
    end

    def render_pb_doc_kit(kit, type, code = true, limit_examples)
      title = render_clickable_title(kit, type)
      ui = raw("<div class='pb--docItem-ui'>
          #{pb_kit(kit: kit, type: type, show_code: code, limit_examples: limit_examples)}</div>")
      title + ui
    end

    def nav_hash_category(link)
      link.keys.first
    end

    def nav_hash_array(link)
      link.first.last
    end

    def all_link(type)
      type == "react" ? kits_path("", type: "react") : kits_path
    end

    def category_link(type, link)
      if type == "react"
        kit_category_show_path(nav_hash_category(link), type: "react")
      else
        kit_category_show_path(nav_hash_category(link), type: "rails")
      end
    end

    def sub_category_link(type, link)
      if type == "react"
        kit_show_reacts_path(link)
      else
        kit_show_path(link)
      end
    end

    def kit_link(type, link)
      if type == "react"
        kit_show_reacts_path(link)
      else
        kit_show_path(link)
      end
    end

    def all_active(controller_name, action_name)
      (controller_name == "pages" && action_name == "kits")
    end

    def category_active(category, link)
      (!category.nil? && category == nav_hash_category(link))
    end

    def kit_active(kit, link)
      (!kit.nil? && kit == link)
    end

    def sub_category_active(kit, link)
      (!kit.nil? && @kit == link)
    end

    def read_source_file(*args)
      path = Playbook::Engine.root.join(*args)
      path.exist? ? path.read : ""
    end

    def format_search_hash(kit)
      label_value_hash = {
        label: kit.to_s.titleize,
        value: @type == "react" || @type.nil? ? "/kits/#{kit}/react" : "/kits/#{kit}",
      }
      label_value_hash
    end

    def search_list
      all_kits = []
      formatted_kits = []
      MENU["kits"].each do |kit|
        if kit.is_a? Hash
          kit.values[0].each do |sub_kit|
            all_kits.push(sub_kit)
          end
        else
          all_kits.push(kit)
        end
      end
      all_kits.sort!.each do |sorted_kit|
        formatted_kits.push(format_search_hash(sorted_kit))
      end
      formatted_kits
    end

  private

    def kit_path(kit)
      Playbook::Engine.root.join("app/pb_kits/playbook/pb_#{kit}")
    end

    def get_kit_examples(kit, type)
      example_file = kit_path(kit).join("docs/example.yml")
      if File.exist? example_file
        examples_list = YAML.load_file(example_file)
                            .inject({}) { |item, (k, v)| item[k.to_sym] = v; item }
        { kit: kit, examples: examples_list[:examples][type] }
      else
        {}
      end
    end

    def render_clickable_title(kit, type)
      url = "#"
      begin
        url = if type == "react"
                kit_show_reacts_path(kit)
              else
                kit_show_path(kit)
              end
      rescue
        puts "Kit Path Not Avaliable"
      end
      render inline: "<a href='#{url}'>#{pb_rails(:title, props: { text: pb_kit_title(kit), tag: 'h3', size: 2 })}</a>"
    end
  end
end
