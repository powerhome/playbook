const VISIBLE_ACTION_BAR_SELECTOR =
  ".row-selection-actions-card.is-visible, .row-selection-actions-card.show-action-card";

const ACTION_BAR_HEIGHT_TRANSITION_MS = 350;

export const measureElementHeight = (element: HTMLElement): number => {
  const { height: rectHeight } = element.getBoundingClientRect();
  const scrollHeight = element.scrollHeight;
  const offsetHeight = element.offsetHeight;

  return Math.ceil(Math.max(rectHeight, scrollHeight, offsetHeight));
};

export const updateStickyActionBarHeight = (
  advancedTableWrapper: HTMLElement | null
): number => {
  if (!advancedTableWrapper) return 0;

  const actionBar = advancedTableWrapper.querySelector(
    VISIBLE_ACTION_BAR_SELECTOR
  ) as HTMLElement | null;

  if (!actionBar) {
    advancedTableWrapper.style.setProperty(
      "--advanced-table-action-bar-height",
      "0px"
    );
    return 0;
  }

  const actionBarHeight = measureElementHeight(actionBar);

  advancedTableWrapper.style.setProperty(
    "--advanced-table-action-bar-height",
    `${actionBarHeight}px`
  );

  return actionBarHeight;
};

export const scheduleStickyActionBarHeightUpdate = (
  advancedTableWrapper: HTMLElement | null
): void => {
  if (!advancedTableWrapper) return;

  updateStickyActionBarHeight(advancedTableWrapper);

  requestAnimationFrame(() => {
    updateStickyActionBarHeight(advancedTableWrapper);
    requestAnimationFrame(() => {
      updateStickyActionBarHeight(advancedTableWrapper);
    });
  });

  window.setTimeout(() => {
    updateStickyActionBarHeight(advancedTableWrapper);
  }, ACTION_BAR_HEIGHT_TRANSITION_MS);
};

export const updateStickyHeaderRowHeights = (
  advancedTableWrapper: HTMLElement | null
): void => {
  if (!advancedTableWrapper) return;

  const table = advancedTableWrapper.querySelector("table.pb_table");
  const thead = table?.querySelector("thead");
  if (!thead) return;

  const rows = Array.from(thead.querySelectorAll("tr"));
  let totalHeight = 0;

  rows.forEach((tr, index) => {
    const height = tr.offsetHeight;
    if (index === 0) {
      advancedTableWrapper.style.setProperty(
        "--advanced-table-header-row-0-height",
        `${height}px`
      );
    } else if (index === 1) {
      advancedTableWrapper.style.setProperty(
        "--advanced-table-header-row-1-height",
        `${height}px`
      );
    }
    totalHeight += height;
  });

  advancedTableWrapper.style.setProperty(
    "--advanced-table-header-height",
    `${totalHeight}px`
  );

  updateStickyActionBarHeight(advancedTableWrapper);
};

export const updateStickyLayoutHeights = (
  advancedTableWrapper: HTMLElement | null
): void => {
  updateStickyHeaderRowHeights(advancedTableWrapper);
};
