import PbEnhancedElement from "../pb_enhanced_element";

const DIALOG_WRAPPER_SELECTOR = "[data-pb-dialog-wrapper]";

export default class PbDialog extends PbEnhancedElement {
  static get selector() {
    return DIALOG_WRAPPER_SELECTOR;
  }

  connect() {
    this.domContentLoadedHandler = () => this.setupDialog()
    this.turboFrameLoadHandler = () => this.setupDialog()
    
    window.addEventListener("DOMContentLoaded", this.domContentLoadedHandler)
    window.addEventListener("turbo:frame-load", this.turboFrameLoadHandler)

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
    // Clean up window event listeners
    if (this.domContentLoadedHandler) {
      window.removeEventListener("DOMContentLoaded", this.domContentLoadedHandler)
    }
    if (this.turboFrameLoadHandler) {
      window.removeEventListener("turbo:frame-load", this.turboFrameLoadHandler)
    }

    // Clean up custom event listeners
    if (this.customEventTypes && Array.isArray(this.customEventTypes)) {
      this.customEventTypes.forEach(eventType => {
        window.removeEventListener(eventType, this.handleCustomEvent)
      })
    }

    // Clean up dialog-specific listeners that were set up in setupDialog
    const openTriggers = document.querySelectorAll("[data-open-dialog]")
    openTriggers.forEach((open) => {
      if (open._openDialogClickHandler) {
        open.removeEventListener("click", open._openDialogClickHandler)
        delete open._openDialogClickHandler
      }
    })

    const closeTriggers = document.querySelectorAll("[data-close-dialog]")
    closeTriggers.forEach((close) => {
      if (close._closeDialogClickHandler) {
        close.removeEventListener("click", close._closeDialogClickHandler)
        delete close._closeDialogClickHandler
      }
    })

    const dialogs = document.querySelectorAll(".pb_dialog_rails")
    dialogs.forEach((dialogElement) => {
      if (dialogElement._outsideClickHandler) {
        dialogElement.removeEventListener("mousedown", dialogElement._outsideClickHandler)
        delete dialogElement._outsideClickHandler
      }
    })
  }

  handleCustomEvent = (event) => {
    const dialogId = event.detail?.dialogId || this.element.querySelector("dialog")?.id
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
          if (!dialog.open) dialog.showModal()
          break
        case 'close':
          if (dialog.open) dialog.close(event.detail?.returnValue)
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
        if (targetDialogOpen && !targetDialogOpen.open) targetDialogOpen.showModal()
      };

      open.addEventListener("click", open._openDialogClickHandler)
    });

    closeTrigger.forEach((close) => {
      const originalClickHandler = close._closeDialogClickHandler
      if (originalClickHandler) close.removeEventListener("click", originalClickHandler)

      close._closeDialogClickHandler = () => {
        const closeTriggerData = close.dataset.closeDialog;
        const targetDialogClose = document.getElementById(closeTriggerData)
        if (targetDialogClose) targetDialogClose.close();
      };

      close.addEventListener("click", close._closeDialogClickHandler)
    });

    // Close dialog box on outside click
    dialogs.forEach((dialogElement) => {
      const originalMousedownHandler = dialogElement._outsideClickHandler
      if (originalMousedownHandler) dialogElement.removeEventListener("mousedown", originalMousedownHandler)
      dialogElement._outsideClickHandler = (event) => {
        const dialogParentDataset = dialogElement.parentElement.dataset
        if (dialogParentDataset.overlayClick === "overlay_close") return

        const dialogModal = event.target.getBoundingClientRect()
        const clickedOutsideDialogModal = event.clientX < dialogModal.left ||
          event.clientX > dialogModal.right ||
          event.clientY < dialogModal.top ||
          event.clientY > dialogModal.bottom

        if (clickedOutsideDialogModal) {
          dialogElement.close()
          event.stopPropagation()
        }
      }

      dialogElement.addEventListener("mousedown", dialogElement._outsideClickHandler);
    })
  }
}
