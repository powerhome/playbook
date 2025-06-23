# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_typeahead/typeahead"

RSpec.describe Playbook::PbTypeahead::Typeahead do
  subject { Playbook::PbTypeahead::Typeahead }

  it { is_expected.to define_boolean_prop(:async).with_default(false) }
  it {
    is_expected.to define_prop(:default_options)
      .of_type(Playbook::Props::HashArray)
      .with_default([])
  }
  it { is_expected.to define_prop(:get_option_label) }
  it { is_expected.to define_prop(:get_option_value) }
  it { is_expected.to define_prop(:id) }
  it { is_expected.to define_prop(:inline).with_default(false) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:load_options) }
  it { is_expected.to define_prop(:margin_bottom).with_default("sm") }
  it { is_expected.to define_prop(:name) }
  it {
    is_expected.to define_prop(:options)
      .of_type(Playbook::Props::HashArray)
      .with_default([])
  }
  it { is_expected.to define_boolean_prop(:pills).with_default(false) }
  it { is_expected.to define_prop(:placeholder) }
  it { is_expected.to define_prop(:search_term_minimum_length).with_default(3) }
  it { is_expected.to define_prop(:search_debounce_timeout).with_default(250) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:input_options).of_type(Playbook::Props::HashProp).with_default({}) }
  it { is_expected.to define_boolean_prop(:preserve_search_input).with_default(false) }

  describe "#classname" do
    it "returns namespaced class name", :aggregate_failures do
      expect(subject.new({}).classname).to eq "pb_typeahead_kit mb_sm"
    end
  end
end
