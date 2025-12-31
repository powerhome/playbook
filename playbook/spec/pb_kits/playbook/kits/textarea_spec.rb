# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_textarea/textarea"

RSpec.describe Playbook::PbTextarea::Textarea do
  subject { Playbook::PbTextarea::Textarea }

  it { is_expected.to define_string_prop(:error) }
  it { is_expected.to define_string_prop(:label) }
  it { is_expected.to define_string_prop(:method) }
  it { is_expected.to define_string_prop(:placeholder) }
  it { is_expected.to define_string_prop(:value) }
  it {
    is_expected.to define_boolean_prop(:dark)
      .with_default(false)
  }
  it {
    is_expected.to define_prop(:rows)
      .of_type(Playbook::Props::Number)
      .with_default(4)
  }
  it {
    is_expected.to define_boolean_prop(:emoji_mask)
      .with_default(false)
  }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_textarea_kit resize_none"
      expect(subject.new({ dark: true }).classname).to eq "pb_textarea_kit dark resize_none"
      expect(subject.new({ error: "Something is wrong" }).classname).to eq "pb_textarea_kit error resize_none"
      expect(subject.new({ dark: true, error: "Something is wrong" }).classname).to eq "pb_textarea_kit dark error resize_none"
    end
  end

  describe "#emoji_mask" do
    context "when emoji_mask is true" do
      it "returns data with pb_emoji_mask in textarea_options" do
        textarea = subject.new(emoji_mask: true)
        expect(textarea.textarea_options[:data]).to eq({ pb_emoji_mask: true })
      end
    end

    context "when emoji_mask is false" do
      it "returns empty data in textarea_options" do
        textarea = subject.new(emoji_mask: false)
        expect(textarea.textarea_options[:data]).to eq({})
      end
    end
  end
end
