import PbEnhancedElement from "../pb_enhanced_element"

export default class PbDrawer extends PbEnhancedElement {
  static get selector() {
    return ".pb_drawer_wrapper"
  }

  connect() {
    this.handleOpenClick = this.handleOpenClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this._openTriggers = Array.from(document.querySelectorAll("[data-open-drawer]"))
    this._openTriggers.forEach(el => {
      el.addEventListener("click", this.handleOpenClick)
    })

    this._closeTriggers = Array.from(document.querySelectorAll("[data-close-drawer]"))
    this._closeTriggers.forEach(el => {
      el.addEventListener("click", this.handleCloseClick)
    })

    this._wrappers = Array.from(document.querySelectorAll(".pb_drawer_wrapper"))
    this._wrappers.forEach(el => {
      el.addEventListener("mousedown", this.handleOutsideClick)
    })
  }

  disconnect() {
    this._openTriggers.forEach(el => {
      el.removeEventListener("click", this.handleOpenClick)
    })
    this._closeTriggers.forEach(el => {
      el.removeEventListener("click", this.handleCloseClick)
    })
    this._wrappers.forEach(el => {
      el.removeEventListener("mousedown", this.handleOutsideClick)
    })
  }

  handleOpenClick(event) {
    const trigger = event.currentTarget
    const drawerId = trigger.dataset.openDrawer
    const dialog = document.getElementById(drawerId)

    if (!dialog) return

    const wrapper = dialog.closest(".pb_drawer_wrapper")
    if (!wrapper) return

    if (dialog.open) return

    wrapper.style.display = ""  // Remove display style instead of setting to block
    wrapper.querySelector(".pb_drawer_overlay").style.display = ""  // Remove display style
    dialog.showModal()
  }

  handleCloseClick(event) {
    const trigger = event.currentTarget
    const wrapper = trigger.closest(".pb_drawer_wrapper") || document.querySelector(".pb_drawer_wrapper")
    const dialog = wrapper.querySelector(".pb_drawer")

    if (dialog) {
      wrapper.style.display = "none"
      wrapper.querySelector(".pb_drawer_overlay").style.display = "none"
      dialog.close()
    }
  }

  handleOutsideClick(event) {
    const wrapper = event.currentTarget
    const dialog = wrapper.querySelector(".pb_drawer")
    const overlay = wrapper.querySelector(".pb_drawer_overlay")

    if (wrapper.dataset.overlayClick === "overlay_close" && event.target === overlay) {
      wrapper.style.display = "none"
      overlay.style.display = "none"
      dialog.close()
      event.stopPropagation()
      return
    }

    const dialogRect = dialog.getBoundingClientRect()
    const clickedOutside =
      event.clientX < dialogRect.left ||
      event.clientX > dialogRect.right ||
      event.clientY < dialogRect.top ||
      event.clientY > dialogRect.bottom

    if (clickedOutside) {
      wrapper.style.display = "none"
      overlay.style.display = "none"
      dialog.close()
      event.stopPropagation()
    }
  }
}
