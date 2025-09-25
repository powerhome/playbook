import PbEnhancedElement from "../pb_enhanced_element"

const BUTTON_SELECTOR = "[data-pb-button-managed]"

export default class PbButton extends PbEnhancedElement {
  static get selector() {
    return BUTTON_SELECTOR
  }

  connect() {
    this._attrManaged = this._attributesPresent()

    this._onClick = (e) => {
      if (this.isDisabled()) {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    }
    this.element.addEventListener("click", this._onClick, true)

    if (this._attrManaged) this._syncClassesFromAttributes()

    this._observer = new MutationObserver(() => {
      this._attrManaged = true
      this._syncClassesFromAttributes()
    })
    this._observer.observe(this.element, {
      attributes: true,
      attributeFilter: ["disabled", "aria-disabled"],
    })
  }

  disconnect() {
    this.element.removeEventListener("click", this._onClick, true)
    this._observer?.disconnect()
  }

  disable() { this.setDisabled(true) }
  enable()  { this.setDisabled(false) }

  setDisabled(state) {
    if (this._isButton()) {
      state
        ? this.element.setAttribute("disabled", "disabled")
        : this.element.removeAttribute("disabled")
    } else {
      state
        ? this.element.setAttribute("aria-disabled", "true")
        : this.element.removeAttribute("aria-disabled")
    }
    this._attrManaged = true
    this._applyClassState(state)
  }

  isDisabled() {
    if (this._isButton()) {
      if (this.element.hasAttribute("disabled")) return true
      if (this._attrManaged && !this.element.hasAttribute("disabled")) return false
    } else {
      const aria = this.element.getAttribute("aria-disabled")
      if (aria === "true") return true
      if (this._attrManaged && aria !== "true") return false
    }
    return this.element.classList.contains("pb_button_disabled")
  }

  _isButton() {
    return this.element.tagName === "BUTTON"
  }

  _attributesPresent() {
    return this.element.hasAttribute("disabled") || this.element.hasAttribute("aria-disabled")
  }

  _syncClassesFromAttributes() {
    const state = this._attrDisabledState()
    const disabled = (state === null) ? false : state
    this._applyClassState(disabled)
  }

  _attrDisabledState() {
    if (this._isButton()) {
      return this.element.hasAttribute("disabled") ? true : null
    } else {
      const aria = this.element.getAttribute("aria-disabled")
      if (aria === "true") return true
      if (aria === "false") return false
      return this.element.hasAttribute("aria-disabled") ? false : null
    }
  }

  _applyClassState(disabled) {
    this.element.classList.toggle("pb_button_disabled", !!disabled)
    this.element.classList.toggle("pb_button_enabled", !disabled)
  }
}

