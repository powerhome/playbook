import {
  scheduleStickyActionBarHeightUpdate,
  updateStickyActionBarHeight,
} from "./Utilities/StickyLayoutHelper";

// Card kit defaults to `transition-property: all`, which can animate height/opacity
// during expand/collapse. Limit transitions to decorative properties only.
const ACTION_BAR_TRANSITION_PROPERTIES = "border-color, box-shadow";

function showActionBar(actionBar, selectedCount) {
  // Get container
  const tableContainer = actionBar.closest('.pb_advanced_table');

  // Update the count before measuring height so the label is included on first show
  const countElement = actionBar.querySelector(".selected-count");
  if (countElement) {
    countElement.textContent = `${selectedCount} Selected`;
  }

  // Expand without animating height so sticky offsets measure the final size
  actionBar.style.transitionProperty = "none";
  actionBar.style.overflow = "visible";
  actionBar.style.opacity = "1";
  actionBar.classList.remove("p_none");
  actionBar.classList.add("p_xs", "is-visible", "show-action-card");
  actionBar.style.height = "auto";

  // Force layout so padding/content are included before measuring
  void actionBar.offsetHeight;

  const expandedHeight = actionBar.scrollHeight;
  actionBar.style.height = `${expandedHeight}px`;

  // Remove hidden-action-bar class when action bar is shown
  if (tableContainer) {
    tableContainer.classList.remove("hidden-action-bar");
    updateStickyActionBarHeight(tableContainer);
    scheduleStickyActionBarHeightUpdate(tableContainer);
  }

  actionBar.style.transitionProperty = ACTION_BAR_TRANSITION_PROPERTIES;
}

function hideActionBar(actionBar) {
  // Get container
  const tableContainer = actionBar.closest('.pb_advanced_table');

  // Hide action bar directly
  actionBar.style.transitionProperty = "none";
  actionBar.style.height = "0px";
  actionBar.style.overflow = "hidden";
  actionBar.style.opacity = "0";
  actionBar.classList.add("p_none");
  actionBar.classList.remove("p_xs", "is-visible", "show-action-card");

  // Add hidden-action-bar class when action bar is hidden
  if (tableContainer) {
    tableContainer.classList.add("hidden-action-bar");
    updateStickyActionBarHeight(tableContainer);
  }

  actionBar.style.transitionProperty = ACTION_BAR_TRANSITION_PROPERTIES;
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
