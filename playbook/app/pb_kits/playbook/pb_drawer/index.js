const drawerHelper = () => {
  const openTrigger = document.querySelectorAll("[data-open-drawer]");
  const closeTrigger = document.querySelectorAll("[data-close-drawer]");
  const drawers = document.querySelectorAll(".pb_drawer_rails")

  const loadingButton = document.querySelector('[data-disable-with="Loading"]');
  if (loadingButton) {
    loadingButton.addEventListener("click", function() {
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
      var openTriggerData = open.dataset.openDrawer;
      console.log(open.dataset)
      var targetdrawer = document.getElementById(openTriggerData)
      if (targetdrawer.open) return;
      targetdrawer.showModal();
    });
  });

  closeTrigger.forEach((close) => {
    close.addEventListener("click", () => {
      var closeTriggerData = close.dataset.closedrawer;
      document.getElementById(closeTriggerData).close();
    });
  });

  // Close drawer box on outside click
  drawers.forEach((drawerElement) => {
    drawerElement.addEventListener("mousedown", (event) => {
      const drawerParentDataset = drawerElement.parentElement.dataset
      if (drawerParentDataset.overlayClick === "overlay_close") return

      const drawerModal = event.target.getBoundingClientRect()
      const clickedOutsidedrawerModal = event.clientX < drawerModal.left ||
                                        event.clientX > drawerModal.right ||
                                        event.clientY < drawerModal.top ||
                                        event.clientY > drawerModal.bottom

      if (clickedOutsidedrawerModal) {
        drawerElement.close()
        event.stopPropagation()
      }
    })
  })
};

export default drawerHelper;
