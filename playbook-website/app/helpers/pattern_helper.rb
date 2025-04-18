# frozen_string_literal: true

module PatternHelper
  def kits_used_in_pattern(pattern_link)
    code = get_raw_code_pattern(pattern_link, "rails")
    code.scan(%r{pb_rails\("(\w+)(?:"|/)}).flatten.uniq
  end

  def get_raw_code_pattern(pattern_link, type)
    ext = case type
          when "rails" then "html.erb"
          when "react" then "jsx"
          else return ""
          end

    path = Rails.root.join("app", "views", "patterns", pattern_link, "index.#{ext}")
    path.exist? ? path.read : ""
  end

  def get_pattern_code_content(pattern_link, type)
    rouge_type = case type
                 when "rails" then "erb"
                 when "react" then "react"
                 else "text"
                 end
    code = get_raw_code_pattern(pattern_link, type)
    raw render_code(code, rouge_type)
  end

  def render_pattern_ui(pattern, type)
    link = pattern["link"]

    case type
    when "rails"
      render template: "patterns/#{link}/index"
    when "react"
      react_component(link.titleize.delete(" ").to_s)
    else
      content_tag(:div, "Invalid pattern type", class: "pb--error-message")
    end
  end
end
