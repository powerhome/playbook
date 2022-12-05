const dialogHelper = () => {
  const openTrigger = document.querySelectorAll("[data-open-dialog]");
  const closeTrigger = document.querySelectorAll("[data-close-dialog]");

  openTrigger.forEach((open) => {
    open.addEventListener("click", () => {
      var openTriggerData = open.dataset.openDialog;
      var targetDialog = document.getElementById(openTriggerData)
      if (targetDialog.open) return;
      targetDialog.showModal();

      //the following allows you to close dialog by clicking on overlay
      targetDialog.addEventListener('click',((event) => {
        var dialogContainerData = targetDialog.parentElement.dataset
         if (dialogContainerData.overlayClick === "overlay_close") return;
          let rect = event.target.getBoundingClientRect();
                if (rect.left > event.clientX ||
              rect.right < event.clientX ||
              rect.top > event.clientY ||
              rect.bottom < event.clientY
          ) {
              targetDialog.close();
          }
        })
      );
    });
  });

  closeTrigger.forEach((close) => {
    close.addEventListener("click", () => {
      var closeTriggerData = close.dataset.closeDialog;
      document.getElementById(closeTriggerData).close();
    });
  });
};

export default dialogHelper;
