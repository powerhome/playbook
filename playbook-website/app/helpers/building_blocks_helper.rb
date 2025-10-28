# frozen_string_literal: true

module BuildingBlocksHelper
  def kits_used_in_building_block(building_block_link)
    code = get_raw_code_building_block(building_block_link, "rails")
    code.scan(%r{pb_rails\("(\w+)(?:"|/)}).flatten.uniq
  end

  def get_raw_code_building_block(building_block_link, type)
    type_string = type.to_s
    ext = case type_string
          when "rails" then "html.erb"
          when "react" then "jsx"
          else return ""
          end

    path = Rails.root.join("app", "views", "building_blocks", building_block_link, "index.#{ext}")
    path.exist? ? path.read : ""
  end

  def get_building_block_code_content(building_block_link, type)
    type_string = type.to_s
    rouge_type = case type_string
                 when "rails" then "erb"
                 when "react" then "react"
                 else "text"
                 end
    code = get_raw_code_building_block(building_block_link, type)
    raw render_code(code, rouge_type)
  end

  def render_building_block_ui(building_block, type)
    link = building_block["link"]
    type_string = type.to_s

    case type_string
    when "rails"
      render template: "building_blocks/#{link}/index"
    when "react"
      react_component(link.titleize.delete(" ").to_s)
    else
      content_tag(:div, "Invalid building block type", class: "pb--error-message")
    end
  end
end
