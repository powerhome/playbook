import PbEnhancedElement from "../pb_enhanced_element"

export default class PbDrawer extends PbEnhancedElement {
  static get selector() {
    return ".pb_drawer_wrapper"
  }

  connect() {
    this.handleLoadingClick = this.handleLoadingClick.bind(this)
    this.handleOpenClick = this.handleOpenClick.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)

    this._loadingButton = document.querySelector('[data-disable-with="Loading"]')
    if (this._loadingButton) {
      this._loadingButton.addEventListener("click", this.handleLoadingClick)
    }

    // Open triggers can be anywhere, find the nearest drawer
    this._openTriggers = Array.from(document.querySelectorAll("[data-open-drawer]"))
    this._openTriggers.forEach(el => {
      el.addEventListener("click", this.handleOpenClick)
    })

    // Close triggers can be anywhere, find the nearest drawer
    this._closeTriggers = Array.from(document.querySelectorAll("[data-close-drawer]"))
    this._closeTriggers.forEach(el => {
      el.addEventListener("click", this.handleCloseClick)
    })

    // Bind outside click to the wrapper
    this._wrappers = Array.from(document.querySelectorAll(".pb_drawer_wrapper"))
    this._wrappers.forEach(el => {
      el.addEventListener("mousedown", this.handleOutsideClick)
    })
  }

  disconnect() {
    if (this._loadingButton) {
      this._loadingButton.removeEventListener("click", this.handleLoadingClick)
    }
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

  handleLoadingClick() {
    const okayLoadingButton = document.querySelector('[data-disable-with="Loading"]')
    const cancelButton = document.querySelector('[data-disable-cancel-with="Loading"]')
    let currentClass = okayLoadingButton.className
    let cancelClass = cancelButton ? cancelButton.className : ""
    let newClass = currentClass.replace("_enabled", "_disabled_loading")
    let newCancelClass = cancelClass.replace("_enabled", "_disabled")

    okayLoadingButton.disabled = true
    if (cancelButton) cancelButton.disabled = true

    okayLoadingButton.className = newClass
    if (cancelButton) cancelButton.className = newCancelClass
  }

  handleOpenClick(event) {
    const trigger = event.currentTarget
    const drawerId = trigger.dataset.openDrawer
    const dialog = document.getElementById(drawerId)

    if (!dialog) return

    const wrapper = dialog.closest(".pb_drawer_wrapper")
    if (!wrapper) return

    if (dialog.open) return

    wrapper.style.display = "block"
    wrapper.querySelector(".pb_drawer_overlay").style.display = "block"
    dialog.showModal()
  }

  handleCloseClick(event) {
    const trigger = event.currentTarget
    // Find the nearest wrapper and dialog
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
