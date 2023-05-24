# frozen_string_literal: true

class ButtonPreview < Lookbook::Preview
  def default
    render Playbook::PbButton::Button.new(
      text: "Button Primary",
      variant: "primary"
    )
  end
end
