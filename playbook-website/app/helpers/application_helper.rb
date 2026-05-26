# frozen_string_literal: true

require "pb_doc_helper"

module ApplicationHelper
  include ::ViteRails::TagHelpers
  include ::Playbook::PbFormsHelper
  include ::Playbook::PbKitHelper
  include ::PlaybookWebsite::Markdown::Helper
  include ::PlaybookWebsite::PbDocHelper
  include ::ReactHelper

  def aggregate_kits_with_status
    all_kits = []

    MENU["kits"].each do |kit|
      kit_category = kit["category"]
      components = kit["components"].map do |c|
        {
          name: c["name"],
          status: c["status"],
          platforms_status: c["platforms_status"],
          parent: c["parent"],
          icons_used: c["icons_used"],
          react_rendered: c["react_rendered"],
          enhanced_element_used: c["enhanced_element_used"],
        }
      end

      all_kits << { kit_category => components }
    end

    all_kits
  end

  # Falls back to kit-level status if platform-specific status is not defined.
  def kit_status_for_platform(kit, platform)
    platforms_status = kit[:platforms_status] || kit["platforms_status"]

    if platforms_status && platforms_status[platform.to_s]
      platforms_status[platform.to_s]
    elsif platforms_status && platforms_status[platform.to_sym]
      platforms_status[platform.to_sym]
    else
      kit[:status] || kit["status"]
    end
  end

  def search_list
    all_kits = []
    formatted_kits = []

    aggregate_kits_with_status.each do |kit|
      if kit.is_a? Hash
        _kit_category, components = kit.first
        components.each do |component|
          name_or_parent = component[:parent].presence || component[:name]
          status_for_type = kit_status_for_platform(component, @type || "react")
          all_kits.push(name_or_parent) if status_for_type != "beta"
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

  def format_search_hash(kit)
    highcharts_kits = %w[pb_bar_graph pb_circle_chart pb_line_graph pb_gauge_chart]
    label = if highcharts_kits.include?(kit.to_s)
              "PB #{kit.to_s.sub(/^pb_/, '').tr(' ', ' ').titleize}"
            else
              kit.to_s.titleize
            end
    {
      label: label,
      value: if @type == "react" || @type.nil?
               "/#{kit == 'advanced_table' ? 'kit_category' : 'kits'}/#{kit}#{kit == 'advanced_table' ? '?type=react' : '/react'}"
             elsif @type == "swift"
               "/#{kit == 'advanced_table' ? 'kit_category' : 'kits'}/#{kit}/swift"
             else
               "/#{kit == 'advanced_table' ? 'kit_category' : 'kits'}/#{kit}#{kit == 'advanced_table' ? '?type=rails' : ''}"
             end,
    }
  end

  def pb_rails(kit, props: {}, &block)
    super kit, props: dark_mode_props(props), &block
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
end
