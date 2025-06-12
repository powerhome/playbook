function showActionBar(actionBar, selectedCount) {
  // Show action bar directly
  actionBar.style.height = "auto";
  actionBar.style.overflow = "visible";
  actionBar.style.opacity = "1";
  actionBar.style.transitionProperty = "all";
  actionBar.style.transitionTimingFunction = "ease-in-out";
  actionBar.classList.remove("p_none");
  actionBar.classList.add("p_xs", "is-visible", "show-action-card");

  // Update the count
  const countElement = actionBar.querySelector(".selected-count");
  if (countElement) {
    countElement.textContent = `${selectedCount} Selected`;
  }
}

function hideActionBar(actionBar) {
  // Hide action bar directly
  actionBar.style.height = "0px";
  actionBar.style.overflow = "hidden";
  actionBar.style.opacity = "0";
  actionBar.classList.add("p_none");
  actionBar.classList.remove("p_xs", "is-visible", "show-action-card");
}

export function updateSelectionActionBar(table) {
  const actionBar = table.querySelector(".row-selection-actions-card");
  if (!actionBar) return;
  console.log("Updating selection action bar...");
  const rowCheckboxes = table.querySelectorAll(
    'label[data-row-id] input[type="checkbox"]'
  );
  const selectedRowCheckboxes = Array.from(rowCheckboxes).filter(
    (cb) => cb.checked
  );
  const selectedCount = selectedRowCheckboxes.length;

  if (selectedCount > 0) {
    showActionBar(actionBar, selectedCount);
  } else {
    hideActionBar(actionBar);
  }
}
