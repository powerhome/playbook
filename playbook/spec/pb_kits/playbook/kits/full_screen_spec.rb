# frozen_string_literal: true

require_relative "../../../../app/pb_kits/playbook/pb_full_screen/full_screen"

RSpec.describe Playbook::PbFullScreen::FullScreen do
  subject { Playbook::PbFullScreen::FullScreen }

  it {
    is_expected.to define_enum_prop(:content_padding)
      .with_values("none", "xxs", "xs", "sm", "md", "lg", "xl")
      .with_default("lg")
  }

  it { is_expected.to define_boolean_prop(:sticky_header).with_default(true) }
end
