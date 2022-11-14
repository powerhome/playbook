const dialogHelper = () => {
  const openTrigger = document.querySelectorAll("[data-open-dialog]");
  const closeTrigger = document.querySelectorAll("[data-close-dialog]");

  openTrigger.forEach((open) => {
    open.addEventListener("click", () => {
      var openTriggerData = open.dataset.openDialog;
      if (document.getElementById(openTriggerData).open) return;
      document.getElementById(openTriggerData).showModal();
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
