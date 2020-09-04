# frozen_string_literal: true

module Playbook
  module PbDocHelper
    def pb_kit_title(title)
      title.remove("pb_").titleize.tr("_", " ")
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

    def read_file(filename)
      if File.file?(filename)
        File.read(filename)
      else
        ""
      end
    end

    def kit_path(kit)
      "#{Playbook::Engine.root}/app/pb_kits/playbook/pb_#{kit}"
    end

    def get_kit_description(kit)
      filename = "#{Playbook::Engine.root}/app/pb_kits/playbook/pb_#{kit}/docs/_description.md"
      read_file(filename)
    end

    def get_per_sample_descriptions(kit, key)
      filename = "#{Playbook::Engine.root}/app/pb_kits/playbook/pb_#{kit}/docs/_#{key}.md"
      read_file(filename)
    end

    def get_kit_footer(kit)
      filename = "#{Playbook::Engine.root}/app/pb_kits/playbook/pb_#{kit}/docs/_footer.md"
      read_file(filename)
    end

    def pb_kit(kit: "", type: "rails", show_code: true)
      # @dark = ENV["dark_mode"]
      @type = type
      @kit_examples = get_kit_examples(kit, type)
      @show_code = show_code
      render partial: "config/kit_example"
    end

    def pb_kits(type: "rails")
      display_kits = []
      kits = get_kits
      kits.each do |kit|
        if kit.is_a?(Hash)
          nav_hash_array(kit).each do |sub_kit|
            display_kits << render_pb_doc_kit(sub_kit, type, false)
          end
        else
          display_kits << render_pb_doc_kit(kit, type, false)
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

    def render_pb_doc_kit(kit, type, code = true)
      title = render_clickable_title(kit, type)
      ui = raw("<div class='pb--docItem-ui'>
          #{pb_kit(kit: kit, type: type, show_code: code)}</div>")
      title + ui
    end

    def pb_kit_api(kit)
      kit_class_obj = get_class_name(kit.to_s)
      @kit_api = if kit_class_obj < Playbook::PbKit::Base
                   kit_class_obj.instance_method(:initialize).parameters.map(&:last)
                 else
                   kit_class_obj.props.keys
                 end
      render partial: "playbook/config/pb_kit_api"
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

  private

    def get_kit_examples(kit, type)
      example_file = File.join(Playbook::Engine.root,
                               "app", "pb_kits", "playbook", "pb_#{kit}", "docs", "example.yml")
      if File.exist? example_file
        examples_list = YAML.load_file(example_file)
                            .inject({}) { |item, (k, v)| item[k.to_sym] = v; item }
        { kit: kit, examples: examples_list[:examples][type] }
      else
        {}
      end
    end

    def get_class_name(kit)
      folder = is_subkit?(kit) ? kit.split("/")[0] : kit
      item = is_subkit?(kit) ? kit.split("/")[-1] : kit
      "Playbook::Pb#{folder.camelize}::#{item.camelize}".safe_constantize
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
