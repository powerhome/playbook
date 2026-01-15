# frozen_string_literal: true

require_relative "../../../app/pb_kits/playbook/pb_body/body"
require_relative "../../../app/pb_kits/playbook/pb_button/button"
require_relative "../../../app/pb_kits/playbook/pb_card/card"
require_relative "../../../app/pb_kits/playbook/pb_title/title"
require_relative "../../../app/pb_kits/playbook/pb_text_input/text_input"
require_relative "../../../app/pb_kits/playbook/pb_flex/flex"
require_relative "../../../app/pb_kits/playbook/pb_link/link"
require_relative "../../../app/pb_kits/playbook/pb_badge/badge"

RSpec.describe Playbook::Flex do
  subject { Playbook::PbBody::Body }

  valid_sizes = %w[xs sm md lg xl]

  test_global_prop(
    :top,
    valid_sizes,
    ->(v) { "top_#{v}" },
    test_subjects: [
      Playbook::PbBody::Body,
      Playbook::PbButton::Button,
      Playbook::PbCard::Card,
      Playbook::PbTitle::Title,
      Playbook::PbTextInput::TextInput,
      Playbook::PbFlex::Flex,
      Playbook::PbLink::Link,
      Playbook::PbBadge::Badge,
    ]
  )

  # Test object values with inset
  describe "#top with object values (inset)" do
    it "returns correct class names", :aggregate_failures do
      test_cases = [
        { value: { value: "md", inset: true }, expected: "top_md_inset" },
        { value: { value: "lg", inset: false }, expected: "top_lg" },
        { value: { value: "sm", inset: true }, expected: "top_sm_inset" },
      ]

      test_cases.each do |test_case|
        instance = subject.new({ top: test_case[:value] })
        expect(instance.classname).to include(test_case[:expected])
      end
    end
  end

  test_global_prop_absence(
    :top,
    %w[top_xs top_sm top_md top_lg top_xl]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :top,
    ["invalid", "bad_value", "not_a_size", "special-chars!@#"],
    %w[top_invalid top_bad_value top_not_a_size top_special-chars!@#],
    allow_errors: true
  )
end
