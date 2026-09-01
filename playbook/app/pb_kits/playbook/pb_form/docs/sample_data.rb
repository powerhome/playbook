# frozen_string_literal: true

# Shared sample data for Form kit interactive docs.
# Loaded from example ERBs via: load Playbook.kit_path("form", "docs", "sample_data.rb").to_s

module PlaybookFormDocsSampleData
module_function

  def select_choices
    [%w[Red red], %w[Blue blue], %w[Green green]]
  end

  def typeahead_options
    [
      { label: "Orange", value: "#FFA500" },
      { label: "Red", value: "#FF0000" },
      { label: "Green", value: "#00FF00" },
      { label: "Blue", value: "#0000FF" },
    ]
  end

  def dropdown_options(id_suffix = "")
    [
      { label: "United States", value: "United States", id: "us#{id_suffix}" },
      { label: "Canada", value: "Canada", id: "ca#{id_suffix}" },
      { label: "Pakistan", value: "Pakistan", id: "pk#{id_suffix}" },
    ]
  end

  def collection
    [
      OpenStruct.new(name: "Alabama", value: 1),
      OpenStruct.new(name: "Alaska", value: 2),
      OpenStruct.new(name: "Arizona", value: 3),
      OpenStruct.new(name: "Arkansas", value: 4),
      OpenStruct.new(name: "California", value: 5),
    ]
  end

  def tree_data(id_prefix)
    [{
      label: "Power Home Remodeling",
      value: "Power Home Remodeling",
      id: "#{id_prefix}-100",
      expanded: true,
      children: [
        {
          label: "People",
          value: "People",
          id: "#{id_prefix}-101",
          expanded: true,
          children: [
            { label: "Talent Acquisition", value: "Talent Acquisition", id: "#{id_prefix}-102" },
            { label: "People Experience", value: "People Experience", id: "#{id_prefix}-103" },
          ],
        },
        {
          label: "Contact Center",
          value: "Contact Center",
          id: "#{id_prefix}-104",
          children: [
            { label: "Customer Service", value: "Customer Service", id: "#{id_prefix}-105" },
            { label: "Energy", value: "Energy", id: "#{id_prefix}-106" },
          ],
        },
      ],
    }]
  end

  def input_types
    [
      { key: "text_field", label: "Text Field" },
      { key: "email_field", label: "Email" },
      { key: "number_field", label: "Number" },
      { key: "search_field", label: "Search" },
      { key: "password_field", label: "Password" },
      { key: "url_field", label: "URL" },
      { key: "textarea", label: "Textarea" },
      { key: "select", label: "Select" },
      { key: "collection_select", label: "Collection Select" },
      { key: "dropdown", label: "Dropdown" },
      { key: "multi_select", label: "Multi Select" },
      { key: "checkbox", label: "Checkbox" },
      { key: "date_picker", label: "Date Picker" },
      { key: "time_picker", label: "Time Picker" },
      { key: "time_zone_select", label: "Time Zone Select" },
      { key: "typeahead", label: "Typeahead" },
      { key: "phone_number", label: "Phone Number" },
      { key: "intl_telephone", label: "Intl Telephone" },
      { key: "star_rating", label: "Star Rating" },
      { key: "multi_level_select", label: "Multi Level Select" },
    ]
  end
end
