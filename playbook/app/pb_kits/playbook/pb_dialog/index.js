import PbEnhancedElement from "../pb_enhanced_element";

const DIALOG_WRAPPER_SELECTOR = "[data-pb-dialog-wrapper]";

export default class PbDialog extends PbEnhancedElement {
  static get selector() {
    return DIALOG_WRAPPER_SELECTOR;
  }

  connect() {
    window.addEventListener("DOMContentLoaded", () => this.setupDialog())
    window.addEventListener("turbo:frame-load", () => this.setupDialog())
  }

  setupDialog() {
    const openTrigger = document.querySelectorAll("[data-open-dialog]");
    const closeTrigger = document.querySelectorAll("[data-close-dialog]");
    const dialogs = document.querySelectorAll(".pb_dialog_rails")

    const loadingButton = document.querySelector('[data-disable-with="Loading"]');
    if (loadingButton) {
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
    }

    openTrigger.forEach((open) => {
      open.addEventListener("click", () => {
        var openTriggerData = open.dataset.openDialog;
        var targetDialog = document.getElementById(openTriggerData)
        if (targetDialog.open) return;
        targetDialog.showModal();
      });
    });

    closeTrigger.forEach((close) => {
      close.addEventListener("click", () => {
        var closeTriggerData = close.dataset.closeDialog;
        document.getElementById(closeTriggerData).close();
      });
    });

    // Close dialog box on outside click
    dialogs.forEach((dialogElement) => {
      dialogElement.addEventListener("mousedown", (event) => {
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
      })
    })
  }
}
