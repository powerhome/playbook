# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_typeahead/typeahead"

RSpec.describe Playbook::PbTypeahead::Typeahead do
  subject { Playbook::PbTypeahead::Typeahead }

  it { is_expected.to define_partial }

  it { is_expected.to define_prop(:async).with_default(false) }
  it { is_expected.to define_prop(:label) }
  it { is_expected.to define_prop(:load_options) }
  it { is_expected.to define_prop(:name) }
  it { is_expected.to define_prop(:options).with_default([]) }
  it { is_expected.to define_prop(:value) }
  it { is_expected.to define_prop(:pills).with_default(false) }
  it { is_expected.to define_prop(:placeholder) }
  it { is_expected.to define_prop(:search_term_minimum_length).with_default(3) }
  it { is_expected.to define_prop(:search_debounce_timeout).with_default(250) }
end
