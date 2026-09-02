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

  # Side-by-side demo panels on wide viewports; stacks on narrow when the row
  # cannot fit both columns (flex-basis mins + wrap).
  def demo_panel_flex_props
    { gap: "md", wrap: true, align: "stretch" }
  end

  # ~2/3 form column; basis keeps a readable floor before wrap.
  def demo_form_column_style
    "flex: 2 1 280px; min-width: 0;"
  end

  # ~1/3 submitted-data column; 200px basis so JSON stays readable.
  def demo_data_column_style
    "flex: 1 1 200px; min-width: 0;"
  end

  def demo_form_card_props
    { padding: "md", shadow: "deep" }
  end

  # Interactive demo snippets are authored at mixed indent levels. Inside the
  # assembled pb_form_with block, body lines should start with two spaces.
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
      { key: "date_picker", label: "Date Picker" },
      { key: "dropdown", label: "Dropdown: Default" },
      { key: "multi_select", label: "Dropdown: Multi Select" },
      { key: "multi_level_select", label: "Multi Level Select" },
      { key: "phone_number", label: "Phone Number" },
      { key: "collection_select", label: "Select: Collection" },
      { key: "select", label: "Select: Default" },
      { key: "time_zone_select", label: "Select: Time Zone" },
      { key: "star_rating", label: "Star Rating" },
      { key: "text_field", label: "Text Input: Default" },
      { key: "email_field", label: "Text Input: Email" },
      { key: "number_field", label: "Text Input: Number" },
      { key: "password_field", label: "Text Input: Password" },
      { key: "search_field", label: "Text Input: Search" },
      { key: "url_field", label: "Text Input: URL" },
      { key: "textarea", label: "Textarea" },
      { key: "time_picker", label: "Time Picker" },
      { key: "typeahead_default", label: "Typeahead: Default" },
      { key: "typeahead", label: "Typeahead: Multi" },
    ]
  end
end
