document.addEventListener("DOMContentLoaded", function() {
    const openTrigger = document.querySelectorAll('[data-open-dialog]');
    const closeTrigger = document.querySelectorAll('[data-close-dialog]');
    openTrigger.forEach((open) => {open.addEventListener("click", (event) => {
      if (!event?.target?.dataset?.openDialog) return;
        document.getElementById(event.target.dataset.openDialog).showModal()
      });
    })
    closeTrigger.forEach((close) => {close.addEventListener("click", (event) => {
      if (!event?.target?.dataset?.closeDialog) return;
        document.getElementById(event.target.dataset.closeDialog).close()
    })
  })
  });
  