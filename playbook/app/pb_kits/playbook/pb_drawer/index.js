import PbEnhancedElement from "../pb_enhanced_element"

export default class PbDrawer extends PbEnhancedElement {
  static get selector() {
    return ".pb_drawer_wrapper"
  }

  connect() {
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handleResize = this.handleResize.bind(this)

    this._toggleTriggers = Array.from(document.querySelectorAll("[data-open-drawer]"))
    this._toggleTriggers.forEach(el => {
      el.addEventListener("click", this.handleToggleClick)
    })

    this._wrappers = Array.from(document.querySelectorAll(".pb_drawer_wrapper"))
    this._wrappers.forEach(el => {
      el.addEventListener("mousedown", this.handleOutsideClick)
    })

    window.addEventListener("resize", this.handleResize)
    this.handleResize()
  }

  disconnect() {
    this._toggleTriggers.forEach(el => {
      el.removeEventListener("click", this.handleToggleClick)
    })
    this._wrappers.forEach(el => {
      el.removeEventListener("mousedown", this.handleOutsideClick)
    })
    window.removeEventListener("resize", this.handleResize)
  }

  getOverlay(wrapper) {
    if (wrapper.id && wrapper.id.startsWith("drawer-wrapper-")) {
      const overlayId = wrapper.id.replace("drawer-wrapper-", "drawer-overlay-")
      return document.getElementById(overlayId)
    }
    return wrapper.querySelector(".pb_drawer_overlay") || wrapper.querySelector(".pb_drawer_no_overlay")
  }

  handleToggleClick(event) {
    const trigger = event.currentTarget
    const drawerId = trigger.dataset.openDrawer
    const dialog = document.getElementById(drawerId)
    if (!dialog) return

    const wrapperId = `drawer-wrapper-${drawerId}`
    const wrapper = document.getElementById(wrapperId)
    if (!wrapper) return

    // Only process if this instance's element is the target wrapper.
    if (wrapper !== this.element) return

    if (wrapper.classList.contains("open")) {
      this.closeDrawer(wrapper, dialog)
      wrapper.dataset.userClosed = "true"
    } else {
      this.openDrawer(wrapper, dialog)
      wrapper.dataset.userClosed = "false"
    }
  }

  openDrawer(wrapper, dialog) {
    const behavior = wrapper.dataset.behavior
    const size = wrapper.dataset.size
    const placement = wrapper.dataset.placement
    this.handlePushOpen(behavior, size, placement)

    wrapper.style.display = ""
    const overlay = this.getOverlay(wrapper)
    if (overlay) overlay.style.display = ""
    
    wrapper.classList.add("open")
    dialog.classList.add("open")
  }

  closeDrawer(wrapper, dialog) {
    const behavior = wrapper.dataset.behavior
    this.handlePushClose(behavior)

    wrapper.style.display = "none"
    const overlay = this.getOverlay(wrapper)
    if (overlay) overlay.style.display = "none"
    
    wrapper.classList.remove("open")
    dialog.classList.remove("open")
  }

  handleOutsideClick(event) {
    const wrapper = event.currentTarget
    const dialog = wrapper.querySelector(".pb_drawer")
    const overlay = this.getOverlay(wrapper)

    if (wrapper.dataset.overlayClick === "overlay_close" && event.target === overlay) {
      this.closeDrawer(wrapper, dialog)
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
      this.closeDrawer(wrapper, dialog)
      event.stopPropagation()
    }
  }

  handleResize() {
    const breakpointValues = {
      none: 0,
      xs: 575,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1400,
    }

    this._wrappers.forEach(wrapper => {
      const bp = wrapper.dataset.breakpoint || "none"
      if (bp === "none") return
      const threshold = breakpointValues[bp]
      if (window.innerWidth >= threshold) {
        if (wrapper.dataset.userClosed !== "true" && !wrapper.classList.contains("open")) {
          const dialog = wrapper.querySelector(".pb_drawer")
          if (dialog) this.openDrawer(wrapper, dialog)
        }
      } else {
        if (wrapper.classList.contains("open")) {
          const dialog = wrapper.querySelector(".pb_drawer")
          if (dialog) this.closeDrawer(wrapper, dialog)
        }
        wrapper.dataset.userClosed = "false"
      }
    })
  }

  handlePushOpen(behavior, size, placement) {
    if (behavior !== "push") return

    const sizeMap = {
      xl: "365px",
      lg: "300px",
      md: "250px",
      sm: "200px",
      xs: "64px",
      full: "100%",
    }

    const body = document.querySelector("body")
    if (!body) return

    if (placement === "left") {
      body.style.cssText = `margin-left: ${sizeMap[size]} !important; margin-right: '' !important;`
    } else if (placement === "right") {
      body.style.cssText = `margin-right: ${sizeMap[size]} !important; margin-left: '' !important;`
    }
    body.classList.add("PBDrawer__Body--open")
  }

  handlePushClose(behavior) {
    if (behavior !== "push") return

    const body = document.querySelector("body")
    if (!body) return

    if (body.classList.contains("PBDrawer__Body--open")) {
      body.classList.add("PBDrawer__Body--close")
    }
    body.style.cssText = ""
    body.classList.remove("PBDrawer__Body--open")
  }
}
