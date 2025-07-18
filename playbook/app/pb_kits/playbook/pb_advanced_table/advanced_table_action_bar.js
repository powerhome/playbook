function showActionBar(actionBar, selectedCount) {
  // Get container
  const tableContainer = actionBar.closest('.pb_advanced_table');

  // Show action bar directly
  actionBar.style.height = "auto";
  actionBar.style.overflow = "visible";
  actionBar.style.opacity = "1";
  actionBar.style.transitionProperty = "all";
  actionBar.style.transitionTimingFunction = "ease-in-out";
  actionBar.classList.remove("p_none");
  actionBar.classList.add("p_xs", "is-visible", "show-action-card");

  // Remove hidden-action-bar class when action bar is shown
  if (tableContainer) {
    tableContainer.classList.remove("hidden-action-bar");
  }

  // Update the count
  const countElement = actionBar.querySelector(".selected-count");
  if (countElement) {
    countElement.textContent = `${selectedCount} Selected`;
  }
}

function hideActionBar(actionBar) {
  // Get container
  const tableContainer = actionBar.closest('.pb_advanced_table');

  // Hide action bar directly
  actionBar.style.height = "0px";
  actionBar.style.overflow = "hidden";
  actionBar.style.opacity = "0";
  actionBar.classList.add("p_none");
  actionBar.classList.remove("p_xs", "is-visible", "show-action-card");

  // Add hidden-action-bar class when action bar is hidden
  if (tableContainer) {
    tableContainer.classList.add("hidden-action-bar");
  }
}

export function updateSelectionActionBar(table, selectedCount) {
  const actionBar = table.querySelector(".row-selection-actions-card");
  if (!actionBar) return;

  if (selectedCount > 0) {
    showActionBar(actionBar, selectedCount);
  } else {
    hideActionBar(actionBar);
  }
}
