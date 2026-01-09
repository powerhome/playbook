# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::PbBody::Body do
  subject { Playbook::PbBody::Body }

  test_nested_global_prop(
    :hover,
    [
      { nested_key: :shadow, values: %w[deep deeper deepest], classname_pattern: ->(v) { "hover_shadow_#{v}" } },
      { nested_key: :scale, values: %w[sm md lg], classname_pattern: ->(v) { "hover_scale_#{v}" } },
      { nested_key: :background, values: %w[red blue green], classname_pattern: ->(v) { "hover_background-#{v}" } },
      { nested_key: :color, values: %w[red blue green], classname_pattern: ->(v) { "hover_color-#{v}" } },
      { nested_key: :underline, values: [true], classname_pattern: ->(_) { "hover_underline" } },
      { nested_key: :underline, values: [false], excludes: "hover_underline" },
      { nested_key: :visible, values: [true], classname_pattern: ->(_) { "hover_visible_true" } },
    ]
  )

  describe "#classname with multiple hover props" do
    it "returns correct class names", :aggregate_failures do
      hover_props = {
        shadow: "deep",
        scale: "sm",
        background: "red",
        color: "blue",
        underline: true,
        visible: true,
      }
      instance = subject.new({ hover: hover_props })
      expect(instance.classname).to include("hover_shadow_deep")
      expect(instance.classname).to include("hover_scale_sm")
      expect(instance.classname).to include("hover_background-red")
      expect(instance.classname).to include("hover_color-blue")
      expect(instance.classname).to include("hover_underline")
      expect(instance.classname).to include("hover_visible_true")
    end
  end
end
