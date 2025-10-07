# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"

RSpec.describe Playbook::PbBody::Body do
  subject { Playbook::PbBody::Body }

  describe "#classname" do
    it "returns correct hover classnames", :aggregate_failures do
      %w[deep deeper deepest].each do |value|
        instance = subject.new({ hover: { shadow: value } })
        expect(instance.classname).to include("hover_shadow_#{value}")
      end

      %w[sm md lg].each do |value|
        instance = subject.new({ hover: { scale: value } })
        expect(instance.classname).to include("hover_scale_#{value}")
      end

      %w[red blue green].each do |value|
        instance = subject.new({ hover: { background: value } })
        expect(instance.classname).to include("hover_background-#{value}")

        instance = subject.new({ hover: { color: value } })
        expect(instance.classname).to include("hover_color-#{value}")
      end

      instance = subject.new({ hover: { underline: true } })
      expect(instance.classname).to include("hover_underline")

      instance = subject.new({ hover: { underline: false } })
      expect(instance.classname).not_to include("hover_underline")

      instance = subject.new({ hover: { visible: true } })
      expect(instance.classname).to include("hover_visible_true")

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
