const dialogHelper = () => {
  const openTrigger = document.querySelectorAll("[data-open-dialog]");
  const closeTrigger = document.querySelectorAll("[data-close-dialog]");
  const dialogs = document.querySelectorAll(".pb_dialog_rails")

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
    dialogElement.addEventListener("click", (event) => {
      const dialogParentDataset = dialogElement.parentElement.dataset
      if (dialogParentDataset.overlayClick === "overlay_close") return

      const dialogModal = event.target.getBoundingClientRect()
      const clickedOutsideDialogModal = dialogModal.left > event.clientX ||
                                        dialogModal.right < event.clientX ||
                                        dialogModal.top > event.clientY ||
                                        dialogModal.bottom < event.clientY

      if (clickedOutsideDialogModal) {
        dialogElement.close()
      }
    })
  })
};

export default dialogHelper;
