# frozen_string_literal: true

class ButtonPreview < Lookbook::Preview
  # @param text text
  # @param size select {choices: [sm, md, lg]}
  # @param variant select {choices: [primary, secondary, link]}
  def default(text: "Button", size: "md", variant: "primary")
    render Playbook::PbButton::Button.new(
      text: text,
      size: size,
      variant: variant
    )
  end
end
