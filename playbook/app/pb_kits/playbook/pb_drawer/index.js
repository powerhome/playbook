import PbEnhancedElement from "../pb_enhanced_element"

export default class PbDrawer extends PbEnhancedElement {
  static get selector() {
    return ".pb_drawer_wrapper_rails"
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

    this._openTriggers = Array.from(document.querySelectorAll("[data-open-drawer]"))
    this._openTriggers.forEach(el => {
      el.addEventListener("click", this.handleOpenClick)
    })

    this._closeTriggers = Array.from(document.querySelectorAll("[data-close-drawer]"))
    this._closeTriggers.forEach(el => {
      el.addEventListener("click", this.handleCloseClick)
    })

    this._drawers = Array.from(document.querySelectorAll(".pb_drawer_rails"))
    this._drawers.forEach(el => {
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
    this._drawers.forEach(el => {
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
    const open = event.currentTarget
    const openTriggerData = open.dataset.openDrawer
    console.log(open.dataset)
    const targetdrawer = document.getElementById(openTriggerData)
    if (targetdrawer.open) return
    targetdrawer.showModal()
  }

  handleCloseClick(event) {
    const close = event.currentTarget
    const closeTriggerData = close.dataset.closeDrawer
    const target = document.getElementById(closeTriggerData)
    if (target) target.close()
  }

  handleOutsideClick(event) {
    const drawerElement = event.currentTarget
    const drawerParentDataset = drawerElement.parentElement.dataset
    if (drawerParentDataset.overlayClick === "overlay_close") return

    const drawerModal = event.target.getBoundingClientRect()
    const clickedOutside =
      event.clientX < drawerModal.left ||
      event.clientX > drawerModal.right ||
      event.clientY < drawerModal.top ||
      event.clientY > drawerModal.bottom

    if (clickedOutside) {
      drawerElement.close()
      event.stopPropagation()
    }
  }
}
