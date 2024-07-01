// app/javascript/controllers/button_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  toggle() {
    this.buttonTarget.disabled = !this.buttonTarget.disabled
    this.updateButtonClass()
  }

  updateButtonClass() {
    const enabledClass = this.data.get("enabledClass")
    const disabledClass = this.data.get("disabledClass")

    if (this.buttonTarget.disabled) {
      this.buttonTarget.classList.remove(enabledClass)
      this.buttonTarget.classList.add(disabledClass)
    } else {
      this.buttonTarget.classList.remove(disabledClass)
      this.buttonTarget.classList.add(enabledClass)
    }
  }
}
