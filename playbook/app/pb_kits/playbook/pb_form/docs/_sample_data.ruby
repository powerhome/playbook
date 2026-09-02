# frozen_string_literal: true

# Shared sample data for Form kit interactive docs.
# Loaded from example ERBs via: load Playbook.kit_path("form", "docs", "_sample_data.ruby").to_s
# Not a .rb file: any .rb under app/pb_kits/.../docs is eager-loaded by Zeitwerk and
# will crash production boot (see #3318). `load` still works with this extension.

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

  def default_input_key
    "text_field"
  end

  def form_open(scope:, validate: false)
    open = "<%= pb_form_with(scope: :#{scope}, url: \"\", method: :get"
    open += ", validate: true" if validate
    "#{open}) do |form| %>"
  end

  def form_close
    [
      "  <%= form.actions do |action| %>",
      "    <%= action.submit %>",
      '    <%= action.button props: { type: "reset", text: "Cancel", variant: "secondary" } %>',
      "  <% end %>",
      "<% end %>",
    ].join("\n")
  end

  # Interactive demo snippets are authored at mixed indent levels. Inside the
  # assembled pb_form_with block, body lines should start with two spaces.
  # Side-by-side demo panels on wide viewports; stacks on narrow when the row
  # cannot fit two columns (fixed_size + wrap, not grow-only flex: "1").
  def demo_panel_flex_props
    { gap: "md", wrap: true, align: "stretch" }
  end

  def demo_panel_column_props
    { grow: true, fixed_size: "280px", min_width: "0" }
  end

  def form_body_snippet(text)
    text.lines.map do |line|
      body = line.chomp
      next "\n" if body.empty?
      next "#{body}\n" if body.start_with?("  ")

      "  #{body}\n"
    end.join
  end

  def input_types
    [
      { key: "checkbox", label: "Checkbox" },
      { key: "collection_select", label: "Collection Select" },
      { key: "date_picker", label: "Date Picker" },
      { key: "dropdown", label: "Dropdown" },
      { key: "email_field", label: "Email" },
      { key: "intl_telephone", label: "Intl Telephone" },
      { key: "multi_level_select", label: "Multi Level Select" },
      { key: "multi_select", label: "Multi Select" },
      { key: "number_field", label: "Number" },
      { key: "password_field", label: "Password" },
      { key: "phone_number", label: "Phone Number" },
      { key: "search_field", label: "Search" },
      { key: "select", label: "Select" },
      { key: "star_rating", label: "Star Rating" },
      { key: "text_field", label: "Text Field" },
      { key: "textarea", label: "Textarea" },
      { key: "time_picker", label: "Time Picker" },
      { key: "time_zone_select", label: "Time Zone Select" },
      { key: "typeahead", label: "Typeahead" },
      { key: "url_field", label: "URL" },
    ]
  end
end
