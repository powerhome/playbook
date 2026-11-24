# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playground::RailsRenderer do
  let(:controller) { ApplicationController.new.tap { |c| c.request = ActionDispatch::TestRequest.create } }
  let(:view_context) { controller.view_context }

  describe "#render" do
    it "renders a button with snake_case props" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "button",
        props: {
          "text" => "Click Me",
          "variant" => "primary",
          "fullWidth" => true,
        }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Click Me")
      expect(result[:html]).to include("pb_button")
    end

    it "rejects kits outside the POC allowlist" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "advanced_table",
        props: {}
      ).render

      expect(result[:html]).to be_nil
      expect(result[:error]).to eq(Playground::PreviewLimits::CLIENT_ERROR)
    end

    it "returns a generic error for invalid prop values" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "button",
        props: {
          "variant" => "not-a-real-variant",
        }
      ).render

      expect(result[:html]).to be_nil
      expect(result[:error]).to eq(Playground::PreviewLimits::CLIENT_ERROR)
    end

    it "rejects oversized children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {},
        children: "x" * (Playground::PreviewLimits::MAX_CHILDREN_BYTES + 1),
        structure_mode: "simple"
      ).render

      expect(result[:html]).to be_nil
      expect(result[:error]).to eq(Playground::PreviewLimits::CLIENT_LIMIT_ERROR)
    end

    it "rejects props nested beyond the depth limit" do
      nested = { "a" => "leaf" }
      (Playground::PreviewLimits::MAX_HASH_DEPTH + 2).times do
        nested = { "wrap" => nested }
      end

      result = described_class.new(
        view_context: view_context,
        kit_name: "button",
        props: nested
      ).render

      expect(result[:html]).to be_nil
      expect(result[:error]).to eq(Playground::PreviewLimits::CLIENT_LIMIT_ERROR)
    end

    it "drops unknown props and html_options instead of forwarding them to the kit" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "button",
        props: {
          "text" => "Safe",
          "notARealProp" => "ignore-me",
          "htmlOptions" => { "onmouseover" => "alert(document.cookie)" },
        }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Safe")
      expect(result[:html]).not_to include("onmouseover")
      expect(result[:html]).not_to include("alert(document.cookie)")
      expect(result[:html]).not_to include("ignore-me")
    end

    it "filters dangerous props on nested JSX children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: { "orientation" => "row" },
        children: '<Button text="Child" htmlOptions="ignored" />'
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Child")
      expect(result[:html]).to include("pb_button")
      expect(result[:html]).not_to include("htmlOptions")
      expect(result[:html]).not_to include("ignored")
    end

    it "renders flex children with JSX Caption components" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: {
          "orientation" => "row",
        },
        children: "<Caption text=\"A\" />\n<Caption text=\"B\" />\n<Caption text=\"C\" />"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("A")
      expect(result[:html]).to include("B")
      expect(result[:html]).to include("C")
      expect(result[:html]).to include("pb_caption_kit")
    end

    it "escapes raw HTML in plain block children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {},
        children: "<b>test</b>",
        structure_mode: "simple"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("&lt;b&gt;test&lt;/b&gt;")
      expect(result[:html]).not_to include("<b>test</b>")
    end

    it "does not treat script tags in plain children as executable HTML" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {},
        children: '<script>alert("x")</script>',
        structure_mode: "simple"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).not_to include("<script>")
      expect(result[:html]).to include("&lt;script&gt;")
    end

    it "rejects non-allowlisted kits nested in ERB children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: {},
        children: '<%= pb_rails("advanced_table") %>',
        structure_mode: "basic"
      ).render

      expect(result[:error]).to be_nil
      # Disallowed kit is not rendered; children fall back to escaped plain text.
      expect(result[:html].to_s).not_to include("pb_advanced_table")
      expect(result[:html].to_s).to include("&lt;%=")
      expect(result[:html].to_s).not_to include("<script>")
    end

    it "rejects compound child kit paths that are not explicitly allowlisted" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: {},
        children: '<%= pb_rails("dialog/not_a_real_part") %>',
        structure_mode: "basic"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html].to_s).to include("&lt;%=")
      expect(Playground::RailsPlaygroundKits.allowed_child_kit?("dialog/dialog_header")).to be(true)
      expect(Playground::RailsPlaygroundKits.allowed_child_kit?("dialog/not_a_real_part")).to be(false)
      expect(Playground::RailsPlaygroundKits.allowed_child_kit?("flex/flex_item")).to be(true)
    end

    it "escapes leading text before pb_rails without dropping the following kit" do
      # Covered with a stubbed view_context in erb_children_renderer_spec (sibling parsing).
      # Integration path can hit cookie_jar when ApplicationController has no request.
      children = 'NOTE <%= pb_rails("caption", props: { text: "Hi" }) %>'
      segments = Playground::ErbChildrenRenderer.new(view_context: view_context)
                                                .send(:parse_segments, children)

      expect(segments.first[:text]).to eq("NOTE")
      expect(segments.last[:kit]).to eq("caption")
      expect(segments.last[:props][:text]).to eq("Hi")
    end

    it "still parses ERB children when pb_rails is at the start" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: {},
        children: '<%= pb_rails("caption", props: { text: "Hi" }) %>',
        structure_mode: "basic"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html].to_s).to include("Hi")
      expect(result[:html].to_s).to include("pb_caption_kit")
    end

    it "escapes raw HTML inside controlled flex item children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: { "flexItemGrow" => true },
        children: "{'<script>alert(1)</script>'}",
        structure_mode: "controlled_flex_item"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).not_to include("<script>")
      expect(result[:html]).to include("&lt;script&gt;")
    end

    it "centers empty_state inside a flex wrapper like the Rails docs example" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "empty_state",
        props: { "header" => "Nothing here", "image" => "default" }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to match(/\A\s*<div class="pb_flex_kit[^"]*justify_content_center[^"]*">\s*<div class="pb_empty_state_kit"/)
    end

    it "applies ProgressStepItem panel props to the first step in progress_step_item_props mode" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "progress_step",
        props: {
          "variant" => "tracker",
          "progressStepItemStatus" => "active",
          "progressStepItemIcon" => "exclamation-triangle",
          "progressStepItemClassName" => "custom-step",
        },
        children: "Review",
        structure_mode: "progress_step_item_props"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Review", "Approve", "Publish")
      expect(result[:html]).to include('<li class="pb_progress_step_item_active custom-step">')
      expect(result[:html]).to include('<li class="pb_progress_step_item_active">', '<li class="pb_progress_step_item_inactive">')
    end

    it "renders progress_simple from React's string percent presets" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "progress_simple",
        props: { "percent" => "50" }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("width:50%;")
    end

    it "renders ProgressStepItem children inside progress_step" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "progress_step",
        props: {},
        children: '<ProgressStepItem status="complete">Step 1</ProgressStepItem><ProgressStepItem status="active">Step 2</ProgressStepItem>'
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("pb_progress_step_item_complete", "pb_progress_step_item_active", "Step 2")
      expect(Playground::RailsPlaygroundKits.allowed_child_kit?("progress_step/progress_step_item")).to be(true)
    end

    it "renders compound card structure for header_body mode" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {
          "headerColor" => "category_1",
          "headerColorStriped" => false,
        },
        children: "Body content here",
        structure_mode: "header_body"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Header title")
      expect(result[:html]).to include("Body content here")
      expect(result[:html]).to include("pb_card_header_kit")
      expect(result[:html]).to include("pb_card_body_kit")
    end

    it "renders compound card structure with footer for full mode" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "card",
        props: {
          "headerColor" => "success",
        },
        children: "Body content here",
        structure_mode: "full"
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("Header title")
      expect(result[:html]).to include("Body content here")
      expect(result[:html]).to include("Action")
    end

    it "drops URL and path-like icon sources to avoid SSRF" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "icon",
        props: {
          "icon" => "user",
          "customIcon" => "http://169.254.169.254/latest/meta-data/x.svg",
        }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("pb_icon")
      expect(result[:html]).not_to include("169.254.169.254")
      expect(result[:html]).not_to include("meta-data")
    end

    it "still allows plain icon names" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "icon",
        props: { "icon" => "user" }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("pb_icon")
    end

    it "drops unsafe customIcon on nested Icon children" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "flex",
        props: { "orientation" => "row" },
        children: '<Icon customIcon="http://127.0.0.1/secret.svg" icon="user" />'
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).not_to include("127.0.0.1")
      expect(result[:html]).not_to include("secret.svg")
    end

    it "drops image on_error so the preview never renders an inline handler" do
      result = described_class.new(
        view_context: view_context,
        kit_name: "image",
        props: { "url" => "https://example.invalid/missing.jpg", "onError" => "alert(1)" }
      ).render

      expect(result[:error]).to be_nil
      expect(result[:html]).to include("pb_image_kit")
      expect(result[:html]).not_to include("onerror")
    end
  end

  describe "text, icon, label, metric, and status kits" do
    global_prop_names = JSON.parse(
      Playbook::Engine.root.join("app/pb_kits/playbook/utilities/global-props.schema.json").read
    )["props"].keys

    %w[
      body detail hashtag highlight icon_circle icon_value image
      label_pill label_value link pill source title_count title_detail
      currency dashboard_value distribution_bar empty_state icon_stat_value legend loading_inline
      progress_pills progress_simple progress_step section_separator skeleton_loading stat_change stat_value
    ].each do |kit|
      it "renders every Rails preset for #{kit}" do
        schema = JSON.parse(Playbook.kit_path(kit, "", "kit.schema.json").read)
        config = JSON.parse(Playbook.kit_path(kit, "docs", "_playground.json").read)
        rails_props = schema["props"].select { |_, d| d["platforms"].blank? || d["platforms"].include?("rails") }
        presets = config["presets"].select do |preset|
          (preset["platforms"].nil? || preset["platforms"].include?("rails")) &&
            preset.fetch("props", {}).keys.all? { |name| rails_props.key?(name) || global_prop_names.include?(name) }
        end

        expect(presets).not_to be_empty

        presets.each do |preset|
          props, global_props = preset.fetch("props", {}).partition { |name, _| rails_props.key?(name) }.map(&:to_h)
          result = described_class.new(
            view_context: view_context,
            kit_name: kit,
            props: props,
            global_props: global_props,
            children: preset["children"].presence
          ).render

          expect(result[:error]).to be_nil, "#{kit} preset #{preset['name']} failed"
          expect(result[:html]).to be_present
        end
      end
    end
  end
end
