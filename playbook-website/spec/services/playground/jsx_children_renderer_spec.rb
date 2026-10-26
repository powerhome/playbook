# frozen_string_literal: true

require "rails_helper"

RSpec.describe Playground::JsxChildrenRenderer do
  let(:view_context) { Object.new }
  let(:renderer) { described_class.new(view_context: view_context) }

  describe "#parse_jsx_attrs" do
    it "does not treat words inside attribute values as boolean shorthands" do
      props = renderer.send(:parse_jsx_attrs, ' text="A dark caption" ')

      expect(props[:text]).to eq("A dark caption")
      expect(props).not_to have_key(:dark)
    end

    it "still detects bare boolean shorthand props" do
      props = renderer.send(:parse_jsx_attrs, ' text="Hello" dark grow ')

      expect(props[:text]).to eq("Hello")
      expect(props[:dark]).to be(true)
      expect(props[:grow]).to be(true)
    end
  end
end
