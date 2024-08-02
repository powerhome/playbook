import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["primaryButton"]

  toggle() {
    this.primaryButtonTarget.disabled = !this.primaryButtonTarget.disabled
    this.updateButtonClass()
    console.log("Button is now " + (this.primaryButtonTarget.disabled ? "disabled" : "enabled"))
  }

  updateButtonClass() {
    if (this.primaryButtonTarget.disabled) {
      this.primaryButtonTarget.classList.remove("pb_button_kit_primary_inline_enabled")
      this.primaryButtonTarget.classList.add("pb_button_kit_primary_inline_disabled")
    } else {
      this.primaryButtonTarget.classList.remove("pb_button_kit_primary_inline_disabled")
      this.primaryButtonTarget.classList.add("pb_button_kit_primary_inline_enabled")
    }
  }
}
