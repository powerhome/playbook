# frozen_string_literal: true

class ButtonComponentPreview < Lookbook::Preview
  def default
    render Playbook::PbButton::Button.new(text: "Button Primary")
  end

  def secondary
    render Playbook::PbButton::Button.new(text: "Button Secondary", variant: "secondary")
  end

  def link
    render Playbook::PbButton::Button.new(text: "Button Link", variant: "link")
  end

  def disabled
    render Playbook::PbButton::Button.new(text: "Button Disabled", disabled: true)
  end
end
