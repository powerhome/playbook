# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_dialog/dialog"

RSpec.describe Playbook::PbDialog::Dialog do
  subject { Playbook::PbDialog::Dialog }

  it { is_expected.to define_prop(:title) }
  it { is_expected.to define_prop(:text) }
  it { is_expected.to define_prop(:confirm_button) }
  it { is_expected.to define_prop(:cancel_button) }
  it {
    is_expected.to define_enum_prop(:size)
      .with_values("sm", "md", "lg", "xl", "status_size", "content")
      .with_default("md")
  }
end
