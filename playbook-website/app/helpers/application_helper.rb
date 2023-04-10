# frozen_string_literal: true

module ApplicationHelper
  include ::Webpacker::React::Helpers
  include ::Playbook::PbFormsHelper
  include ::Playbook::PbKitHelper

  def pb_category_kits(category_kits: [], type: "rails")
    display_kits = []
    category_kits.each do |kit|
      display_kits << render_pb_doc_kit(kit, type, false)
    end
    raw("<div class='pb--docItem'>#{display_kits.join("</div><div class='pb--docItem'>")}</div>")
  end

  def pb_doc_kit_footer(kit)
    pb_doc_example_read_source kit, "_footer.md"
  end

  def pb_doc_kit_description(kit)
    pb_doc_example_read_source kit, "_description.md"
  end

  def pb_doc_example_read_source(kit, file)
    Playbook.kit_path(kit, "docs", file).read
  rescue Errno::ENOENT
    ""
  end

  def pb_doc_has_kit_type?(kit, type = "rails")
    extension = type == "react" ? "jsx" : "erb"
    Playbook.kit_path(kit, "docs")
            .glob("**/*.#{extension}")
            .present?
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

  def format_search_hash(kit)
    {
      label: kit.to_s.titleize,
      value: @type == "react" || @type.nil? ? "/kits/#{kit}/react" : "/kits/#{kit}",
    }
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

  def pb_rails(kit, props: {}, &block)
    super kit, props: dark_mode_props(props), &block
  end

  def description(kit, example_key)
    read_kit_file(kit, "_#{example_key}.md")
  end

private

  def dark_mode_props(props)
    if props[:dark].nil?
      (props || {}).merge(dark: dark_mode?)
    else
      props
    end
  end

  def dark_mode?
    cookies[:dark_mode].eql? "true"
  end

  def read_kit_file(kit, *args)
    path = ::Playbook.kit_path(kit, "docs", *args)
    path.exist? ? path.read : ""
  end
end
