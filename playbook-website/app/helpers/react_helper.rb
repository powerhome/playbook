# frozen_string_literal: true

module ReactHelper
  # Custom react_component helper to replace Webpacker React
  # This will render a div with data attributes for the component name and props
  # The mounting script will look for these divs and mount the appropriate React components
  # Sister def in kit_base. Any changes here should be reflected there.
  def react_component(component_name, props = {}, html_options = {})
    # Convert props to JSON for the data attribute
    props_json = props.to_json

    # Build the HTML attributes
    html_attrs = {
      "data-pb-react-component" => component_name,
      "data-pb-react-props" => props_json,
    }

    # Merge with any additional HTML options
    html_attrs.merge!(html_options)

    # Return the div element
    content_tag(:div, "", html_attrs)
  end
end
