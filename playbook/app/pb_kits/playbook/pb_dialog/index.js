import PbEnhancedElement from "../pb_enhanced_element";

const DIALOG_WRAPPER_SELECTOR = "[data-pb-dialog-wrapper]";

export default class PbDialog extends PbEnhancedElement {
  static get selector() {
    return DIALOG_WRAPPER_SELECTOR;
  }

  connect() {
    window.addEventListener("DOMContentLoaded", () => this.setupDialog())
    window.addEventListener("turbo:frame-load", () => this.setupDialog())

    // Code for custom_event_type setup (can take multiple events in a string separated by commas)
    const customEventTypeString = this.element.dataset.customEventType
    if (customEventTypeString && !this.element.hasAttribute("data-custom-event-handled")) {
      this.customEventTypes = customEventTypeString.split(",").map(e => e.trim()).filter(Boolean)
      this.customEventTypes.forEach(eventType => {
        window.addEventListener(eventType, this.handleCustomEvent)
      })

      this.element.setAttribute("data-custom-event-handled", "true")
    }
  }

  disconnect() {
    if (this.customEventTypes && Array.isArray(this.customEventTypes)) {
      this.customEventTypes.forEach(eventType => {
        window.removeEventListener(eventType, this.handleCustomEvent)
      })
    }
  }

  handleCustomEvent = (event) => {
    const dialogId = event.detail?.dialogId || this.element.querySelector("[role='dialog']")?.id
    const dialog = dialogId && document.getElementById(dialogId)
  
    if (!dialog) {
      console.warn(`[PbDialog] Could not find dialog with ID '${dialogId}'`)
      return
    }
  
    this.setupDialog()
  
    const action = event.detail?.action || 'open'
  
    // Known Actions - four "standard" dialog actions that felt like things devs might want to do
    const knownActions = ['open', 'close', 'clickConfirm', 'clickCancel'];
  
    if (knownActions.includes(action)) {
      switch (action) {
        case 'open':
          if (!this.isDialogOpen(dialog)) this.openDialog(dialog)
          break
        case 'close':
          if (this.isDialogOpen(dialog)) this.closeDialog(dialog, event.detail?.returnValue)
          break
        case 'clickConfirm':
          this.triggerButtonClick(dialog, event, 'confirm')
          break
        case 'clickCancel':
          this.triggerButtonClick(dialog, event, 'cancel')
          break
      }
    } 
    // Custom Actions - flexible for Turbo or other integration
    else if (typeof event.detail?.customAction === 'function') {
      event.detail.customAction({ dialog, event })
    } else if (window.pbDialogActions?.[action]) {
      // Can register custom actions globally
      window.pbDialogActions[action]({ dialog, event })
    } else {
      console.warn(`[PbDialog] Unknown action: ${action}`)
    }
  }

  triggerButtonClick(dialog, event, type) {
    const buttonId = event.detail?.[`${type}ButtonId`] || 
                     dialog.closest('[data-pb-dialog-wrapper]')?.dataset[`${type}ButtonId`]
    const button = buttonId ? document.getElementById(buttonId) : 
                  dialog.querySelector(`[data-${type}-button]`)
  
    if (button) {
      button.click()
    } else {
      console.warn(`[PbDialog] Could not find ${type} button for dialog`)
    }
  }

  isDialogOpen(dialog) {
    return dialog && dialog.classList.contains('pb_dialog_open')
  }

  openDialog(dialog) {
    if (!dialog) return
    
    const wrapper = dialog.closest('[data-pb-dialog-wrapper]')
    if (!wrapper) return
    
    // Add open class to dialog
    dialog.classList.add('pb_dialog_open')
    dialog.setAttribute('aria-hidden', 'false')
    
    // Show overlay
    const overlay = wrapper.querySelector('[data-pb-dialog-overlay]')
    if (overlay) {
      overlay.classList.add('pb_dialog_overlay_open')
    }
    
    // Lock body scroll
    document.body.classList.add('pb_dialog_body_open')
    
    // Focus management - focus first focusable element
    const firstFocusable = dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (firstFocusable) {
      firstFocusable.focus()
    } else {
      dialog.focus()
    }
  }

  closeDialog(dialog, returnValue) {
    if (!dialog) return
    
    const wrapper = dialog.closest('[data-pb-dialog-wrapper]')
    if (!wrapper) return
    
    // Remove open class
    dialog.classList.remove('pb_dialog_open')
    dialog.setAttribute('aria-hidden', 'true')
    
    // Hide overlay
    const overlay = wrapper.querySelector('[data-pb-dialog-overlay]')
    if (overlay) {
      overlay.classList.remove('pb_dialog_overlay_open')
    }
    
    // Unlock body scroll
    document.body.classList.remove('pb_dialog_body_open')
    
    // Dispatch close event for compatibility
    dialog.dispatchEvent(new CustomEvent('close', { detail: { returnValue } }))
  }

  setupDialog() {
    const openTrigger = document.querySelectorAll("[data-open-dialog]");
    const closeTrigger = document.querySelectorAll("[data-close-dialog]");
    const dialogs = document.querySelectorAll(".pb_dialog_rails")

    const loadingButton = document.querySelector('[data-disable-with="Loading"]');
    if (loadingButton && !loadingButton.dataset.listenerAttached) {
      loadingButton.addEventListener("click", function () {
        const okayLoadingButton = document.querySelector('[data-disable-with="Loading"]');
        const cancelButton = document.querySelector('[data-disable-cancel-with="Loading"]');
        let currentClass = okayLoadingButton.className;
        let cancelClass = cancelButton ? cancelButton.className : "";

        let newClass = currentClass.replace("_enabled", "_disabled_loading");
        let newCancelClass = cancelClass.replace("_enabled", "_disabled");

        // Disable the buttons
        okayLoadingButton.disabled = true;
        if (cancelButton) cancelButton.disabled = true;

        okayLoadingButton.className = newClass;
        if (cancelButton) cancelButton.className = newCancelClass;
      });
    
      // Prevent multiple registrations
      loadingButton.dataset.listenerAttached = "true";
    }
    
    openTrigger.forEach((open) => {
      const originalClickHandler = open._openDialogClickHandler
      if (originalClickHandler) open.removeEventListener("click", originalClickHandler)

      open._openDialogClickHandler = () => {
        const openTriggerData = open.dataset.openDialog;
        const targetDialogOpen = document.getElementById(openTriggerData)
        if (targetDialogOpen && !this.isDialogOpen(targetDialogOpen)) {
          this.openDialog(targetDialogOpen)
        }
      };

      open.addEventListener("click", open._openDialogClickHandler)
    });

    closeTrigger.forEach((close) => {
      const originalClickHandler = close._closeDialogClickHandler
      if (originalClickHandler) close.removeEventListener("click", originalClickHandler)

      close._closeDialogClickHandler = () => {
        const closeTriggerData = close.dataset.closeDialog;
        const targetDialogClose = document.getElementById(closeTriggerData)
        if (targetDialogClose) {
          this.closeDialog(targetDialogClose)
        }
      };

      close.addEventListener("click", close._closeDialogClickHandler)
    });

    // Close dialog box on outside click
    dialogs.forEach((dialogElement) => {
      const wrapper = dialogElement.closest('[data-pb-dialog-wrapper]')
      if (!wrapper) return
      
      const overlay = wrapper.querySelector('[data-pb-dialog-overlay]')
      if (!overlay) return
      
      const originalClickHandler = overlay._overlayClickHandler
      if (originalClickHandler) overlay.removeEventListener("click", originalClickHandler)
      
      overlay._overlayClickHandler = (event) => {
        const wrapperDataset = wrapper.dataset
        if (wrapperDataset.overlayClick === "overlay_close") return

        // Only close if clicking directly on overlay, not on dialog content
        // Check if click is on overlay (not on dialog or its children)
        if (event.target === overlay && !dialogElement.contains(event.target)) {
          this.closeDialog(dialogElement)
          event.stopPropagation()
        }
      }

      overlay.addEventListener("click", overlay._overlayClickHandler);
      
      // Also handle ESC key
      const originalKeydownHandler = dialogElement._escapeKeyHandler
      if (originalKeydownHandler) dialogElement.removeEventListener("keydown", originalKeydownHandler)
      
      dialogElement._escapeKeyHandler = (event) => {
        if (event.key === 'Escape' && this.isDialogOpen(dialogElement)) {
          this.closeDialog(dialogElement)
        }
      }
      
      dialogElement.addEventListener("keydown", dialogElement._escapeKeyHandler)
    })
  }
}
