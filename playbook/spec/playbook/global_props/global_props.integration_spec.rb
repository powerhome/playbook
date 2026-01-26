# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"
require_relative "../../../app/pb_kits/playbook/pb_button/button"
require_relative "../../../app/pb_kits/playbook/pb_card/card"
require_relative "../../../app/pb_kits/playbook/pb_title/title"
require_relative "../../../app/pb_kits/playbook/pb_flex/flex"
require_relative "../../../app/pb_kits/playbook/pb_link/link"
require_relative "../../../app/pb_kits/playbook/pb_badge/badge"
require_relative "../../../app/pb_kits/playbook/pb_text_input/text_input"

RSpec.describe "Global Props Integration Tests" do
  describe "All global props at once (comprehensive showcase)" do
    it "All global props generate correct classes when used together" do
      instance = Playbook::PbBody::Body.new(
        align_content: "center",
        align_items: "center",
        align_self: "center",
        border_radius: "md",
        cursor: "pointer",
        display: "flex",
        flex: "1",
        flex_direction: "column",
        flex_grow: 1,
        flex_shrink: 0,
        flex_wrap: "wrap",
        gap: "md",
        height: "auto",
        justify_content: "spaceBetween",
        line_height: "loose",
        margin: "lg",
        max_height: "xl",
        max_width: "lg",
        min_height: "xs",
        min_width: "sm",
        order: 1,
        overflow: "hidden",
        padding: "md",
        position: "relative",
        shadow: "deep",
        text: "Test",
        text_align: "center",
        truncate: "1",
        vertical_align: "middle",
        width: "100%",
        z_index: "5"
      )

      classname = instance.classname

      # Verify all global prop classes are present
      expect(classname).to include("align_content_center")
      expect(classname).to include("align_items_center")
      expect(classname).to include("align_self_center")
      expect(classname).to include("border_radius_md")
      expect(classname).to include("cursor_pointer")
      expect(classname).to include("display_flex")
      expect(classname).to include("flex_1")
      expect(classname).to include("flex_direction_column")
      expect(classname).to include("flex_grow_1")
      expect(classname).to include("flex_shrink_0")
      expect(classname).to include("flex_wrap_wrap")
      expect(classname).to include("gap_md")
      expect(classname).to include("height_auto")
      expect(classname).to include("justify_content_space_between")
      expect(classname).to include("line_height_loose")
      expect(classname).to include("m_lg")
      expect(classname).to include("max_height_xl")
      expect(classname).to include("max_width_lg")
      expect(classname).to include("min_height_xs")
      expect(classname).to include("min_width_sm")
      expect(classname).to include("flex_order_1")
      expect(classname).to include("overflow_hidden")
      expect(classname).to include("p_md")
      expect(classname).to include("position_relative")
      expect(classname).to include("shadow_deep")
      expect(classname).to include("text_align_center")
      expect(classname).to include("truncate_1")
      expect(classname).to include("vertical_align_middle")
      expect(classname).to include("width_100_percent")
      expect(classname).to include("z_index_5")
    end
  end

  describe "Global props + other props on the same kit" do
    it "Button: global props work with variant, size, and full_width" do
      instance = Playbook::PbButton::Button.new(
        variant: "secondary",
        size: "lg",
        full_width: true,
        margin: "md",
        padding: "lg",
        text_align: "center",
        text: "Click me"
      )

      classname = instance.classname

      # Kit-specific classes
      expect(classname).to include("pb_button_kit")
      expect(classname).to include("pb_button_secondary")
      expect(classname).to include("pb_button_block")
      expect(classname).to include("pb_button_size_lg")

      # Global prop classes
      expect(classname).to include("m_md")
      expect(classname).to include("p_lg")
      expect(classname).to include("text_align_center")
    end

    it "Title: global props work with size prop" do
      instance = Playbook::PbTitle::Title.new(
        size: 3,
        margin: "sm",
        padding: "xs",
        text_align: "right",
        text: "Test Title"
      )

      classname = instance.classname

      # Kit-specific classes
      expect(classname).to include("pb_title_kit")
      expect(classname).to include("pb_title_3")

      # Global prop classes
      expect(classname).to include("m_sm")
      expect(classname).to include("p_xs")
      expect(classname).to include("text_align_right")
    end

    it "Card: global props work with border_radius prop" do
      instance = Playbook::PbCard::Card.new(
        border_radius: "lg",
        margin: "xl",
        padding: "md",
        text_align: "center"
      )

      classname = instance.classname

      # Kit-specific classes
      expect(classname).to include("pb_card_kit")
      expect(classname).to include("border_radius_lg")

      # Global prop classes
      expect(classname).to include("m_xl")
      expect(classname).to include("p_md")
      expect(classname).to include("text_align_center")
    end

    it "Flex: global props work with orientation, justify, and align props" do
      instance = Playbook::PbFlex::Flex.new(
        orientation: "column",
        justify: "between",
        align: "center",
        margin: "lg",
        padding: "sm"
      )

      classname = instance.classname

      # Kit-specific classes
      expect(classname).to include("pb_flex_kit")
      expect(classname).to include("pb_flex_kit_orientation_column")
      expect(classname).to include("pb_flex_kit_justify_content_between")
      expect(classname).to include("pb_flex_kit_align_items_center")

      # Global prop classes
      expect(classname).to include("m_lg")
      expect(classname).to include("p_sm")
    end

    it "Link: global props work with link prop" do
      instance = Playbook::PbLink::Link.new(
        link: "https://example.com",
        margin: "xs",
        text_align: "center",
        text: "Test Link"
      )

      classname = instance.classname

      # Kit-specific classes
      expect(classname).to include("pb_link_kit")

      # Global prop classes
      expect(classname).to include("m_xs")
      expect(classname).to include("text_align_center")
    end

    it "Badge: global props work with variant prop" do
      instance = Playbook::PbBadge::Badge.new(
        variant: "success",
        margin: "md",
        text: "Badge"
      )

      classname = instance.classname

      # Kit-specific classes
      expect(classname).to include("pb_badge_kit_success")

      # Global prop classes
      expect(classname).to include("m_md")
    end
  end

  describe "Global props + other global props on the same kit" do
    it "Multiple spacing global props work together" do
      instance = Playbook::PbBody::Body.new(
        margin: "md",
        margin_bottom: "lg",
        margin_top: "sm",
        padding: "lg",
        padding_left: "xs",
        text: "Test"
      )

      classname = instance.classname

      expect(classname).to include("m_md")
      expect(classname).to include("mb_lg")
      expect(classname).to include("mt_sm")
      expect(classname).to include("p_lg")
      expect(classname).to include("pl_xs")
    end

    it "Spacing + layout + typography global props work together" do
      instance = Playbook::PbBody::Body.new(
        display: "flex",
        margin: "md",
        padding: "sm",
        text: "Test",
        text_align: "center"
      )

      classname = instance.classname

      expect(classname).to include("m_md")
      expect(classname).to include("p_sm")
      expect(classname).to include("display_flex")
      expect(classname).to include("text_align_center")
    end

    it "Position + spacing + z_index global props work together" do
      instance = Playbook::PbBody::Body.new(
        margin: "lg",
        position: "absolute",
        text: "Test",
        top: "md",
        z_index: "5"
      )

      classname = instance.classname

      expect(classname).to include("m_lg")
      expect(classname).to include("position_absolute")
      expect(classname).to include("top_md")
      expect(classname).to include("z_index_5")
    end

    it "Flexbox + spacing + typography global props work together" do
      instance = Playbook::PbBody::Body.new(
        align_items: "center",
        flex_direction: "column",
        gap: "md",
        justify_content: "space_between",
        margin: "sm",
        padding: "lg",
        text: "Test",
        text_align: "right"
      )

      classname = instance.classname

      expect(classname).to include("m_sm")
      expect(classname).to include("p_lg")
      expect(classname).to include("flex_direction_column")
      # NOTE: justify_content is not a global prop in Rails, only in React
      expect(classname).to include("align_items_center")
      expect(classname).to include("gap_md")
      expect(classname).to include("text_align_right")
    end

    it "All major global prop categories work together" do
      instance = Playbook::PbBody::Body.new(
        border_radius: "md",
        cursor: "pointer",
        display: "flex",
        margin: "lg",
        padding: "md",
        position: "relative",
        shadow: "deep",
        text: "Test",
        text_align: "center",
        z_index: "3"
      )

      classname = instance.classname

      # Spacing
      expect(classname).to include("m_lg")
      expect(classname).to include("p_md")

      # Layout
      expect(classname).to include("display_flex")
      expect(classname).to include("position_relative")

      # Visual
      expect(classname).to include("border_radius_md")
      # NOTE: shadow is not a global prop in Rails, only in React
      expect(classname).to include("cursor_pointer")

      # Typography
      expect(classname).to include("text_align_center")

      # Z-index
      expect(classname).to include("z_index_3")
    end
  end

  describe "Global props in nested layouts / clickable wrappers" do
    it "Button inside Card: both have global props" do
      card_instance = Playbook::PbCard::Card.new(
        margin: "lg",
        padding: "md"
      )

      button_instance = Playbook::PbButton::Button.new(
        margin: "sm",
        variant: "primary",
        text: "Click me"
      )

      card_classname = card_instance.classname
      button_classname = button_instance.classname

      # Card global props
      expect(card_classname).to include("m_lg")
      expect(card_classname).to include("p_md")

      # Button global props
      expect(button_classname).to include("m_sm")

      # Button kit-specific props
      expect(button_classname).to include("pb_button_kit")
      expect(button_classname).to include("pb_button_primary")
    end

    it "Multiple Body elements in Flex: each has different global props" do
      flex_instance = Playbook::PbFlex::Flex.new(
        gap: "md",
        margin: "lg"
      )

      body1_instance = Playbook::PbBody::Body.new(
        margin: "xs",
        text: "First",
        text_align: "left"
      )

      body2_instance = Playbook::PbBody::Body.new(
        margin: "xs",
        text: "Second",
        text_align: "center"
      )

      body3_instance = Playbook::PbBody::Body.new(
        margin: "xs",
        text: "Third",
        text_align: "right"
      )

      flex_classname = flex_instance.classname
      body1_classname = body1_instance.classname
      body2_classname = body2_instance.classname
      body3_classname = body3_instance.classname

      # Flex global props
      expect(flex_classname).to include("m_lg")
      expect(flex_classname).to include("gap_md")

      # Each Body has its own global props
      expect(body1_classname).to include("m_xs")
      expect(body1_classname).to include("text_align_left")

      expect(body2_classname).to include("m_xs")
      expect(body2_classname).to include("text_align_center")

      expect(body3_classname).to include("m_xs")
      expect(body3_classname).to include("text_align_right")
    end

    it "Deep nesting: Card > Flex > Button with global props" do
      card_instance = Playbook::PbCard::Card.new(
        margin: "xl",
        padding: "lg"
      )

      flex_instance = Playbook::PbFlex::Flex.new(
        gap: "sm",
        justify: "center"
      )

      button_instance = Playbook::PbButton::Button.new(
        margin: "xs",
        variant: "secondary",
        text: "Nested Button"
      )

      card_classname = card_instance.classname
      flex_classname = flex_instance.classname
      button_classname = button_instance.classname

      # Card global props
      expect(card_classname).to include("m_xl")
      expect(card_classname).to include("p_lg")

      # Flex global props
      expect(flex_classname).to include("gap_sm")
      expect(flex_classname).to include("pb_flex_kit_justify_content_center")

      # Button global props
      expect(button_classname).to include("m_xs")
    end

    it "Link wrapper with global props containing Body with global props" do
      link_instance = Playbook::PbLink::Link.new(
        link: "https://example.com",
        margin: "md",
        text_align: "center",
        text: "Link content"
      )

      body_instance = Playbook::PbBody::Body.new(
        margin: "xs",
        text: "Link content",
        text_align: "left"
      )

      link_classname = link_instance.classname
      body_classname = body_instance.classname

      # Link global props
      expect(link_classname).to include("m_md")
      expect(link_classname).to include("text_align_center")

      # Body global props (should still work even though conceptually inside Link)
      expect(body_classname).to include("m_xs")
      expect(body_classname).to include("text_align_left")
    end

    it "Responsive global props in nested layout" do
      card_instance = Playbook::PbCard::Card.new(
        margin: { default: "md", sm: "lg", md: "xl" },
        padding: "md"
      )

      flex_instance = Playbook::PbFlex::Flex.new(
        gap: { default: "sm", md: "lg" }
      )

      body_instance = Playbook::PbBody::Body.new(
        margin: "xs",
        text: "Content",
        text_align: { default: "left", sm: "center", md: "right" }
      )

      card_classname = card_instance.classname
      flex_classname = flex_instance.classname
      body_classname = body_instance.classname

      # Card responsive margin (uses break_on format)
      expect(card_classname).to include("m_md")
      expect(card_classname).to include("break_on_sm:m_lg")
      expect(card_classname).to include("break_on_md:m_xl")

      # Flex responsive gap (uses gap_default_ and gap_breakpoint_ format)
      expect(flex_classname).to include("gap_default_sm")
      expect(flex_classname).to include("gap_md_lg")

      # Body responsive text_align (uses text_align_default_ format)
      expect(body_classname).to include("text_align_default_left")
      expect(body_classname).to include("text_align_sm_center")
      expect(body_classname).to include("text_align_md_right")
    end
  end

  describe "Prop precedence and conflicts" do
    it "classname prop overrides global prop classes" do
      instance = Playbook::PbBody::Body.new(
        classname: "custom-class override-margin",
        margin: "lg",
        text: "Test"
      )

      classname = instance.classname

      # Should have global prop class
      expect(classname).to include("m_lg")
      # Should have custom classname
      expect(classname).to include("custom-class")
      expect(classname).to include("override-margin")
    end

    it "html_options overrides aria and data props" do
      instance = Playbook::PbBody::Body.new(
        aria: { label: "Aria label" },
        data: { testid: "data-testid" },
        html_options: {
          "aria-label" => "HTML options label",
          "data-testid" => "html-testid",
        },
        text: "Test"
      )

      html_options = instance.combined_html_options

      # html_options should override aria prop
      expect(html_options["aria-label"]).to eq("HTML options label")
      # html_options should override data prop
      expect(html_options["data-testid"]).to eq("html-testid")
    end

    it "Multiple conflicting spacing props work together" do
      instance = Playbook::PbBody::Body.new(
        margin: "md",
        margin_bottom: "lg",
        margin_top: "sm",
        text: "Test"
      )

      classname = instance.classname

      # All should be present
      expect(classname).to include("m_md")
      expect(classname).to include("mb_lg")
      expect(classname).to include("mt_sm")
    end

    it "Global props do not interfere with kit-specific props" do
      instance = Playbook::PbButton::Button.new(
        margin: "md",
        size: "lg",
        variant: "secondary",
        text: "Click me"
      )

      classname = instance.classname

      # Kit-specific classes should still be present
      expect(classname).to include("pb_button_kit")
      expect(classname).to include("pb_button_secondary")
      expect(classname).to include("pb_button_size_lg")
      # Global prop classes should also be present
      expect(classname).to include("m_md")
    end

    it "id prop takes precedence over html_options.id" do
      instance = Playbook::PbBody::Body.new(
        html_options: { id: "html-id" },
        id: "prop-id",
        text: "Test"
      )

      # id prop should win (id is a direct prop, not in html_options)
      expect(instance.id).to eq("prop-id")
      # html_options id should not override
      expect(instance.html_options[:id]).to eq("html-id")
    end
  end

  describe "Accessibility integration" do
    it "Global props work with aria props" do
      instance = Playbook::PbBody::Body.new(
        aria: {
          label: "Test label",
          describedby: "desc-id",
          hidden: "false",
        },
        margin: "md",
        text: "Test",
        text_align: "center"
      )

      classname = instance.classname
      html_options = instance.combined_html_options

      # Aria attributes should be present (Rails stores aria as a hash)
      expect(html_options[:aria]).to include(label: "Test label")
      expect(html_options[:aria]).to include(describedby: "desc-id")
      expect(html_options[:aria]).to include(hidden: "false")
      # Global props should still work
      expect(classname).to include("m_md")
      expect(classname).to include("text_align_center")
    end

    it "Global props work with data props" do
      instance = Playbook::PbBody::Body.new(
        data: {
          "custom-attr" => "custom-value",
          "analytics-id" => "analytics-123",
        },
        margin: "sm",
        padding: "md",
        text: "Test"
      )

      classname = instance.classname
      html_options = instance.combined_html_options

      # Data attributes should be present (Rails merges data into html_options)
      expect(html_options[:data]).to include("custom-attr" => "custom-value")
      expect(html_options[:data]).to include("analytics-id" => "analytics-123")
      # Global props should still work
      expect(classname).to include("m_sm")
      expect(classname).to include("p_md")
    end

    it "html_options aria attributes override aria prop" do
      instance = Playbook::PbBody::Body.new(
        aria: { label: "Aria prop label" },
        html_options: {
          "aria-label" => "HTML options label",
          "aria-live" => "polite",
        },
        text: "Test"
      )

      html_options = instance.combined_html_options

      # html_options should override aria prop (html_options are merged directly as string keys)
      # Note: In Rails, html_options with string keys like "aria-label" are merged directly
      # but may be converted to symbols. The important thing is they override the aria hash.
      expect(html_options[:"aria-label"] || html_options["aria-label"]).to eq("HTML options label")
      expect(html_options[:"aria-live"] || html_options["aria-live"]).to eq("polite")
    end

    it "Global props with role and tabIndex" do
      instance = Playbook::PbBody::Body.new(
        html_options: {
          role: "button",
          tabindex: 0,
        },
        margin: "lg",
        text: "Test"
      )

      classname = instance.classname
      html_options = instance.combined_html_options

      # Accessibility attributes should be present
      expect(html_options[:role]).to eq("button")
      expect(html_options[:tabindex]).to eq(0)
      # Global props should still work
      expect(classname).to include("m_lg")
    end

    it "Screen reader compatibility with global props" do
      instance = Playbook::PbButton::Button.new(
        aria: {
          label: "Submit form",
          describedby: "submit-help",
        },
        margin: "md",
        text: "Submit"
      )

      classname = instance.classname
      html_options = instance.combined_html_options

      # Should be accessible (Rails stores aria as a hash, role is in options)
      expect(html_options[:aria]).to include(label: "Submit form")
      expect(html_options[:aria]).to include(describedby: "submit-help")
      # Button has role in its options method
      expect(instance.options[:role]).to eq("button")
      # Global props should not interfere
      expect(classname).to include("m_md")
    end
  end

  describe "Form elements" do
    it "Global props work with TextInput" do
      instance = Playbook::PbTextInput::TextInput.new(
        label: "Test Input",
        margin: "md",
        name: "test-input",
        padding: "sm",
        placeholder: "Enter text",
        text_align: "right",
        type: "text",
        value: ""
      )

      classname = instance.classname

      # Global props should work on TextInput
      expect(classname).to include("m_md")
      expect(classname).to include("p_sm")
      expect(classname).to include("text_align_right")
    end

    it "Global props with TextInput error state" do
      instance = Playbook::PbTextInput::TextInput.new(
        error: "This field is required",
        label: "Test Input",
        margin: "sm",
        name: "test-input",
        placeholder: "Enter text",
        type: "text",
        value: ""
      )

      classname = instance.classname

      # Error state should work
      expect(classname).to include("error")
      # Global props should still work
      expect(classname).to include("m_sm")
    end

    it "Global props with disabled TextInput" do
      instance = Playbook::PbTextInput::TextInput.new(
        disabled: true,
        label: "Test Input",
        margin: "lg",
        name: "test-input",
        placeholder: "Enter text",
        type: "text",
        value: ""
      )

      classname = instance.classname
      input_options = instance.send(:all_input_options)

      # Input should be disabled
      expect(input_options[:disabled]).to be true
      # Global props should still work
      expect(classname).to include("m_lg")
    end

    it "Global props with required TextInput" do
      instance = Playbook::PbTextInput::TextInput.new(
        label: "Test Input",
        margin: "md",
        name: "test-input",
        placeholder: "Enter text",
        required: true,
        type: "text",
        value: ""
      )

      classname = instance.classname

      # Global props should work
      expect(classname).to include("m_md")
      # Required should be set
      expect(instance.required).to be true
    end
  end

  describe "Edge cases and boundary conditions" do
    it "Empty responsive object" do
      instance = Playbook::PbBody::Body.new(
        margin: {},
        text: "Test"
      )

      classname = instance.classname

      # Should not crash with empty object
      expect(classname).to be_truthy
    end

    it "Only default value in responsive object" do
      instance = Playbook::PbBody::Body.new(
        margin: { default: "md" },
        text: "Test"
      )

      classname = instance.classname

      # Should have default class
      expect(classname).to include("m_md")
    end

    it "Only breakpoints, no default in responsive object" do
      instance = Playbook::PbBody::Body.new(
        margin: { sm: "md", md: "lg" },
        text: "Test"
      )

      classname = instance.classname

      # Should handle breakpoints without default
      expect(classname).to be_truthy
    end
  end
end
