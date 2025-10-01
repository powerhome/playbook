# frozen_string_literal: true

require "pb_doc_helper"

module ApplicationHelper
  include ::ViteRails::TagHelpers
  include ::Playbook::PbFormsHelper
  include ::Playbook::PbKitHelper
  include ::PlaybookWebsite::Markdown::Helper
  include ::PlaybookWebsite::PbDocHelper
  include ::ReactHelper

  def pb_category_kits(category_kits: [], type: "rails", limit_examples: true)
    display_kits = []
    category_kits.each do |kit|
      display_kits << render_pb_doc_kit(kit, type, limit_examples) if pb_doc_has_kit_type?(kit, type)
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
    case type
    when "rails"
      extension = "erb"
      query_string = extension
    when "react"
      extension = "jsx"
      query_string = extension
    when "swift"
      extension = "md"
      query_string = "_swift"
    end

    Playbook.kit_path(kit, "docs")
            .glob("**/*.#{extension}")
            .any? { |path| path.basename.to_s.include?(query_string) }
            .present?
  end

  def category_has_kits?(category_kits: [], type: "rails")
    category_kits.any? { |kit| pb_doc_has_kit_type?(kit, type) }
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
    case type
    when "react"
      kit_show_reacts_path(link)
    when "swift"
      kit_show_swift_path(link)
    else
      kit_show_path(link)
    end
  end

  def kit_link(type, link)
    case type
    when "react"
      kit_show_reacts_path(link)
    when "swift"
      kit_show_swift_path(link)
    else
      kit_show_path(link)
    end
  end

  def doc_link(parent, page = nil)
    if page.nil?
      guides_parent_path(parent)
    else
      guides_parent_page_path(parent, page)
    end
  end

  def gh_edit_link(parent, page, link_extension)
    gh_link = "https://github.com/powerhome/playbook/edit/master/playbook-website/app/views/guides/"
    gh_link + if page.nil?
                link_extension
              else
                "#{parent}/#{link_extension}"
              end
  end

  def all_active(controller_name, action_name)
    controller_name == "pages" && action_name == "kits"
  end

  def category_active(category, link)
    !category.nil? && category == nav_hash_category(link)
  end

  def kit_active(kit, link)
    !kit.nil? && kit == link
  end

  def sub_category_active(kit, link)
    !kit.nil? && @kit == link
  end

  def format_search_hash(kit)
    {
      label: kit.to_s.titleize,
      value: if @type == "react" || @type.nil?
               "/#{kit == 'advanced_table' ? 'kit_category' : 'kits'}/#{kit}#{kit == 'advanced_table' ? '?type=react' : '/react'}"
             elsif @type == "swift"
               "/#{kit == 'advanced_table' ? 'kit_category' : 'kits'}/#{kit}/swift"
             else
               "/#{kit == 'advanced_table' ? 'kit_category' : 'kits'}/#{kit}#{kit == 'advanced_table' ? '?type=rails' : ''}"
             end,
    }
  end

  def aggregate_kits_with_status
    all_kits = []

    MENU["kits"].each do |kit|
      kit_category = kit["category"]
      # Modify this line to include name, status and parent in the components array
      components = kit["components"].map { |c| { name: c["name"], status: c["status"], parent: c["parent"] } }

      all_kits << { kit_category => components }
    end

    all_kits
  end

  def search_list
    all_kits = []
    formatted_kits = []

    aggregate_kits_with_status.each do |kit|
      if kit.is_a? Hash
        _kit_category, components = kit.first
        components.each do |component|
          name_or_parent = component[:parent].presence || component[:name]
          all_kits.push(name_or_parent) if component[:status] != "beta"
        end
      else
        all_kits.push(kit)
      end
    end

    all_kits.uniq!
    all_kits.sort!

    all_kits.each do |sorted_kit|
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
