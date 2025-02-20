import PbEnhancedElement from "../pb_enhanced_element"

export default class PbDrawer extends PbEnhancedElement {
  static get selector() {
    return ".pb_drawer_wrapper"
  }

  connect() {
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handleResize = this.handleResize.bind(this)

    // Existing logic
    this._toggleTriggers = Array.from(document.querySelectorAll("[data-open-drawer]"))
    this._toggleTriggers.forEach(el => {
      el.addEventListener("click", this.handleToggleClick)
    })

    this._wrappers = Array.from(document.querySelectorAll(".pb_drawer_wrapper"))
    this._wrappers.forEach(el => {
      el.addEventListener("mousedown", this.handleOutsideClick)
    })

    // NEW: Grab any within-element drawers that might have a data-breakpoint
    this._withinElementDrawers = Array.from(
      document.querySelectorAll(".pb_drawer_within_element_rails[data-breakpoint]")
    )

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

  // ----------------------------------------
  // HELPERS
  // ----------------------------------------
  getOverlay(wrapper) {
    if (wrapper.id && wrapper.id.startsWith("drawer-wrapper-")) {
      const overlayId = wrapper.id.replace("drawer-wrapper-", "drawer-overlay-")
      return document.getElementById(overlayId)
    }
    return wrapper.querySelector(".pb_drawer_overlay") || wrapper.querySelector(".pb_drawer_no_overlay")
  }

  // ----------------------------------------
  // HANDLERS
  // ----------------------------------------
  handleToggleClick(event) {
    const trigger = event.currentTarget
    const drawerId = trigger.dataset.openDrawer
    const dialog = document.getElementById(drawerId)
    if (!dialog) return

    // NEW LOGIC: If the dialog is a "within element" variant
    if (dialog.classList.contains("pb_drawer_within_element_rails")) {
      // We do NOT rely on a wrapper or overlay.
      if (dialog.classList.contains("open")) {
        this.closeWithinElementDrawer(dialog)
      } else {
        this.openWithinElementDrawer(dialog)
      }
      return
    }

    // EXISTING LOGIC: Standard wrappers / overlays
    const wrapperId = `drawer-wrapper-${drawerId}`
    const wrapper = document.getElementById(wrapperId)
    if (!wrapper) return

    if (wrapper !== this.element) return

    if (wrapper.classList.contains("open")) {
      this.closeDrawer(wrapper, dialog)
      wrapper.dataset.userClosed = "true"
    } else {
      this.openDrawer(wrapper, dialog)
      wrapper.dataset.userClosed = "false"
    }
  }

  // ----------------------------------------
  // WITHIN-ELEMENT DRAWER METHODS
  // ----------------------------------------
// ----------------------------------------
// WITHIN-ELEMENT DRAWER METHODS
// ----------------------------------------
openWithinElementDrawer(dialog) {
  // If already open, do nothing
  if (dialog.classList.contains("open")) return

  // 1) Ensure we start at max-height: 0
  dialog.style.maxHeight = "0px"
  // 2) Force a reflow so the browser applies "0px"
  //    (just reading offsetHeight will do this)
  dialog.offsetHeight

  // 3) Add the "open" class (which has the CSS transition)
  dialog.classList.add("open")

  // 4) Now measure the content & set max-height to scrollHeight for a smooth expand
  const finalHeight = dialog.scrollHeight + "px"
  dialog.style.maxHeight = finalHeight

  // 5) (Optional) Once the transition ends, set maxHeight to "none"
  //    to allow the drawer to grow naturally if contents inside expand.
  dialog.addEventListener("transitionend", function handleOpenEnd(e) {
    if (e.propertyName === "max-height") {
      dialog.style.maxHeight = "none"
      dialog.removeEventListener("transitionend", handleOpenEnd)
    }
  })
}

closeWithinElementDrawer(dialog) {
  // If it's already closed, do nothing
  if (!dialog.classList.contains("open")) return

  // 1) Measure the current height, so we can animate from this down to 0
  const currentHeight = dialog.scrollHeight
  dialog.style.maxHeight = currentHeight + "px"

  // 2) Force reflow so the browser applies the above maxHeight
  dialog.offsetHeight

  // 3) Remove the "open" class
  dialog.classList.remove("open")

  // 4) Animate down to 0
  dialog.style.maxHeight = "0px"

  // 5) Once transition ends, optionally do more cleanup
  dialog.addEventListener("transitionend", function handleCloseEnd(e) {
    if (e.propertyName === "max-height") {
      // If you want it invisible, you could do:
      // dialog.style.display = "none"
      dialog.removeEventListener("transitionend", handleCloseEnd)
      dialog.style.maxHeight = "0px"
    }
  })
}

  // ----------------------------------------
  // STANDARD DRAWER METHODS
  // ----------------------------------------
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

    // Only apply the "outside click" logic if it's NOT the "within element" type:
    if (dialog && dialog.classList.contains("pb_drawer_within_element_rails")) {
      // We might skip outside-click close or handle differently.
      return
    }

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

    // -----------------------------------
    // 1) WRAPPERS LOGIC (UNMODIFIED)
    // -----------------------------------
    this._wrappers.forEach(wrapper => {
      const bp = wrapper.dataset.breakpoint || "none"
      if (bp === "none") return

      const threshold = breakpointValues[bp] || 0
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

    // -----------------------------------
    // 2) WITHIN-ELEMENT DRAWER LOGIC (NEW)
    // -----------------------------------
    this._withinElementDrawers.forEach(drawer => {
      const bp = drawer.dataset.breakpoint || "none"
      if (bp === "none") return

    const threshold = breakpointValues[bp] || 0
    // We'll also mimic a 'data-user-closed' on the drawer itself
    // so that if a user manually closes it, we don't auto-open
    // again on resize
    if (window.innerWidth >= threshold) {
      // If user hasn't explicitly closed it and it's not open yet
      if (drawer.dataset.userClosed !== "true" && !drawer.classList.contains("open")) {
        this.openWithinElementDrawer(drawer)
      }
    } else {
      // If it's currently open, let's close it
      if (drawer.classList.contains("open")) {
        this.closeWithinElementDrawer(drawer)
      }
      // Reset data-user-closed so on next up-size we can open it
      drawer.dataset.userClosed = "false"
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
