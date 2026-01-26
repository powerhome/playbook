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

  # Cursor values are in camelCase for props, converted to snake_case for classnames
  valid_values = %w[
    auto default none contextMenu help pointer progress wait cell
    crosshair text verticalText alias copy move noDrop notAllowed grab
    grabbing eResize nResize neResize nwResize sResize seResize swResize wResize
    ewResize nsResize neswResize nwseResize colResize rowResize allScroll zoomIn zoomOut
  ]

  test_global_prop(
    :cursor,
    valid_values,
    ->(v) { "cursor_#{v.underscore}" },
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

  test_global_prop_absence(
    :cursor,
    %w[cursor_auto cursor_pointer cursor_default cursor_none]
  )

  # NOTE: Currently using allow_errors: true because globalProps generates classes for invalid values
  test_global_prop_invalid_values(
    :cursor,
    ["invalid", "bad_value", "not_a_cursor", "special-chars!@#"],
    %w[cursor_invalid cursor_bad_value cursor_not_a_cursor cursor_special-chars!@#],
    allow_errors: true
  )
end
