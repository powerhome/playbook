import PbEnhancedElement from "../pb_enhanced_element";

const ADVANCED_TABLE_SELECTOR = "[data-advanced-table]";
const DOWN_ARROW_SELECTOR = "#advanced-table_open_icon";
const UP_ARROW_SELECTOR = "#advanced-table_close_icon";

export default class PbAdvancedTable extends PbEnhancedElement {
  static get selector() {
    return ADVANCED_TABLE_SELECTOR;
  }

  tableData = new Map();

  // Get or initialize data for a specific table
  getTableData(tableId) {
    if (!this.tableData.has(tableId)) {
      this.tableData.set(tableId, {
        selectedRows: new Set(),
        expandedRows: new Set(),
        initialized: false
      });
    }
    return this.tableData.get(tableId);
  }

  // Get the table container from any element within the table
  getTableContainer() {
    return this.element.closest(".pb_advanced_table");
  }

  // Get table ID
  getTableId() {
    const tableContainer = this.getTableContainer();
    if (!tableContainer || !tableContainer.id) return null;
    return tableContainer.id;
  }

  // Update the data attribute with selected rows
  updateTableSelectedRowsAttribute() {
    const tableContainer = this.getTableContainer();
    const tableId = this.getTableId();
    if (!tableId) return;

    const tableData = this.getTableData(tableId);
    const selectedRowsArray = Array.from(tableData.selectedRows);

    // Update data attribute
    tableContainer.dataset.selectedRows = JSON.stringify(selectedRowsArray);

    // Update action bar visibility
    this.updateActionBarVisibility(tableContainer, tableData.selectedRows);
  }

  // Update action bar visibility based on selection state
  updateActionBarVisibility(tableContainer, selectedRows) {
    if (!tableContainer) return;

    const actionBar = tableContainer.querySelector(".row-selection-actions-card");
    if (!actionBar) return;

    const selectedCount = selectedRows.size;

    // Update count display
    const countElement = actionBar.querySelector(".selected-count");
    if (countElement) {
      countElement.textContent = `${selectedCount} Selected`;
    }

    // Show/hide based on selection
    if (selectedCount > 0) {
      this.showActionBar(actionBar);
    } else {
      this.hideActionBar(actionBar);
    }
  }

  // Show action bar with animation
  showActionBar(actionBar) {
    if (!actionBar) return;

    // Force display block
    actionBar.style.display = "block";

    // Get the height before animation
    const height = actionBar.scrollHeight + "px";

    // Force all style changes directly
    actionBar.style.height = height;
    actionBar.classList.add("is-visible");
    actionBar.classList.add("show-action-card");
    actionBar.classList.replace("p_none", "p_xs");
    // This is for keeping the border around the card when showing the action bar
    actionBar.classList.replace("pb_card_kit_deselected_border_none", "pb_card_kit_deselected");
    actionBar.style.overflow = "hidden";

    // Complete animation after delay
    window.setTimeout(() => {
      if (actionBar.classList.contains("is-visible")) {
        actionBar.style.height = "";
        actionBar.style.overflow = "visible";
      }
    }, 300);
  }

  // Hide action bar with animation
  hideActionBar(actionBar) {
    if (!actionBar) return;

    // Set exact height before animation
    actionBar.style.height = actionBar.scrollHeight + "px";
    actionBar.offsetHeight; // Trigger reflow

    // Animate to height 0
    window.setTimeout(() => {
      actionBar.style.height = "0";
      actionBar.style.overflow = "hidden";
    }, 10);

    // Remove visibility classes after animation
    window.setTimeout(() => {
      actionBar.classList.remove("is-visible");
      actionBar.classList.remove("show-action-card");
      actionBar.classList.replace("p_xs", "p_none");
      // This is for removing the border when hiding the action bar
      actionBar.classList.replace("pb_card_kit_deselected", "pb_card_kit_deselected_border_none");
    }, 300);
  }

  // Check if the row is expanded or collapsed
  // This is used to determine the background color of the row
  // when the checkbox is checked or unchecked
  isRowExpanded(rowEl) {
    const closeIcon = rowEl.querySelector(UP_ARROW_SELECTOR);
    return closeIcon?.style.display === "none" || !closeIcon;
  }

  // Update parent checkboxes based on child selections
  updateParentCheckboxes(checkbox) {
    const rowEl = checkbox.closest("tr");
    if (!rowEl) return;

    const table = rowEl.closest("table");
    if (!table) return;

    const tableId = this.getTableId();
    if (!tableId) return;

    const tableData = this.getTableData(tableId);

    const contentTrail = rowEl.dataset.advancedTableContent;
    if (!contentTrail) return;

    const ancestorIds = contentTrail.split("-").slice(0, -1);

    ancestorIds.reverse();
    ancestorIds.forEach((ancestorId) => {
      const parentRowSelector = `[data-advanced-table-content$="${ancestorId}"]`;
      const parentRow = table.querySelector(parentRowSelector);
      if (!parentRow) return;

      const parentLabel = parentRow.querySelector("label[data-row-id]");
      if (!parentLabel) return;

      const parentCheckbox = parentLabel.querySelector(
        "input[type='checkbox']"
      );
      if (!parentCheckbox) return;

      // Find all immediate children of parent linked to ancestor Id, filter our subrow headers
      const children = Array.from(
        table.querySelectorAll(`tr[data-row-parent$="_${ancestorId}"]`)
      ).filter((child) => {
        const content = child.dataset.advancedTableContent;
        return !(content && content.endsWith("sr"));
      });

      const allChildrenChecked = Array.from(children).every((child) => {
        const childLabel = child.querySelector("label[data-row-id]");
        if (!childLabel) return false;
        const childCheckbox = childLabel.querySelector(
          "input[type='checkbox']"
        );
        if (!childCheckbox) return false;
        return childCheckbox.checked;
      });

      // Update parent checkbox
      parentCheckbox.checked = allChildrenChecked;

      const parentCheckboxId = parentCheckbox.id;
      if (allChildrenChecked) {
        tableData.selectedRows.add(parentCheckboxId);
        parentRow.classList.add("bg-row-selection");
        parentRow.classList.remove("bg-white", "bg-silver");
      } else {
        tableData.selectedRows.delete(parentCheckboxId);
      }
      if (!allChildrenChecked) {
        parentRow.classList.remove("bg-row-selection");

        if (this.isRowExpanded(parentRow)) {
          parentRow.classList.remove("bg-silver");
          parentRow.classList.add("bg-white");
        } else {
          parentRow.classList.remove("bg-white");
          parentRow.classList.add("bg-silver");
        }
      }
    });
  }

  // Handle row checkbox click
  handleCheckboxClick(event) {
    const checkbox = event.currentTarget;
    const rowId = checkbox.id;
    const isChecked = checkbox.checked;
    const rowEl = checkbox.closest("tr");

    const tableId = this.getTableId();
    if (!tableId) return;

    const tableData = this.getTableData(tableId);

    if (isChecked) {
      tableData.selectedRows.add(rowId);
      rowEl.classList.add("bg-row-selection");
      rowEl.classList.remove("bg-white", "bg-silver");
    } else {
      tableData.selectedRows.delete(rowId);
    }
    // Update background color on row
    if (!isChecked) {
      rowEl.classList.remove("bg-row-selection");

      if (this.isRowExpanded(rowEl)) {
        rowEl.classList.remove("bg-silver");
        rowEl.classList.add("bg-white");
      } else {
        rowEl.classList.remove("bg-white");
        rowEl.classList.add("bg-silver");
      }
    }

    if (rowEl) {
      const table = rowEl.closest("table");
      const rowContent = rowEl.dataset.advancedTableContent;

      if (rowContent) {
        const childRows = table.querySelectorAll(
          `[data-advanced-table-content^="${rowContent}-"]`
        );

        childRows.forEach((childRow) => {
          const label = childRow.querySelector("label[data-row-id]");
          if (!label) return;

          const childCheckbox = label.querySelector("input[type='checkbox']");
          if (!childCheckbox) return;

          childCheckbox.checked = isChecked;

          const childRowId = childCheckbox.id;
          const childRowEl = childCheckbox.closest("tr");
          if (isChecked) {
            tableData.selectedRows.add(childRowId);
            childRowEl?.classList.add("bg-row-selection");
            childRowEl?.classList.remove("bg-white", "bg-silver");
          } else {
            tableData.selectedRows.delete(childRowId);
          }
          if (!isChecked) {
            childRowEl?.classList.remove("bg-row-selection");

            if (this.isRowExpanded(childRowEl)) {
              childRowEl?.classList.remove("bg-silver");
              childRowEl?.classList.add("bg-white");
            } else {
              childRowEl?.classList.remove("bg-white");
              childRowEl?.classList.add("bg-silver");
            }
          }
        });
      }
    }

    this.updateParentCheckboxes(checkbox);

    this.updateTableSelectedRowsAttribute();

    const table = checkbox.closest("table");
    const selectAllCheckbox = table.querySelector("#select-all-rows");

    if (selectAllCheckbox) {
      const allCheckboxes = table.querySelectorAll(
        "label[data-row-id] input[type='checkbox']"
      );
      const allChecked = Array.from(allCheckboxes).every((cb) => cb.checked);

      const selectAllInput = selectAllCheckbox.querySelector(
        'input[type="checkbox"]'
      );
      selectAllInput.checked = allChecked;
    }
  }

  get target() {
    const table = this.element.closest("table");
    return table.querySelectorAll(`[data-row-parent="${this.element.id}"]`);
  }

  static isCollapsing = false;

  connect() {
    // Get table container and check for ID
    const tableContainer = this.getTableContainer();
    const tableId = this.getTableId();
    if (!tableContainer || !tableId) return;

    // Get or initialize table data
    const tableData = this.getTableData(tableId);

    // Handle toggle click
    this.element.addEventListener("click", () => {
      if (!PbAdvancedTable.isCollapsing) {
        const isExpanded =
          this.element.querySelector(UP_ARROW_SELECTOR).style.display ===
          "inline-block";
        if (!isExpanded) {
          tableData.expandedRows.add(this.element.id);
        } else {
          tableData.expandedRows.delete(this.element.id);
        }
        this.toggleElement(this.target, tableData.expandedRows);
      }
    });

    this.hideCloseIcon();

    const table = this.element.closest("table");
    if (!table) return;

    // Skip if this table is already initialized
    if (tableData.initialized) return;

    // Initialize the action bar
    const actionBar = tableContainer.querySelector(".row-selection-actions-card");
    if (actionBar) {
      // Direct style application
      Object.assign(actionBar.style, {
        height: '0px',
        overflow: 'hidden',
        display: 'block',
        opacity: '0'
      });

      // Remove visibility classes
      actionBar.classList.remove("p_xs", "is-visible", "show-action-card");
      actionBar.classList.add("p_none");

      // Add CSS rules
      const styleId = `action-bar-styles-${tableId}`;
      let styleTag = document.getElementById(styleId);
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }

      styleTag.textContent = `
        #${tableId} .row-selection-actions-card.is-visible.show-action-card {
          height: auto !important;
          overflow: visible !important;
          display: block !important;
          opacity: 1 !important;
          transition: height 0.3s ease, opacity 0.3s ease !important;
        }
      `;

      // Direct DOM event listeners for checkboxes
      const checkboxes = table.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          // Count selected checkboxes
          const selectedCount = Array.from(checkboxes).filter(cb => cb.checked).length;

          if (selectedCount > 0) {
            // Show action bar directly
            actionBar.style.height = 'auto';
            actionBar.style.overflow = 'visible';
            actionBar.style.opacity = '1';
            actionBar.classList.remove("p_none");
            actionBar.classList.add("p_xs", "is-visible", "show-action-card");

            // Update the count
            const countElement = actionBar.querySelector(".selected-count");
            if (countElement) {
              countElement.textContent = `${selectedCount} Selected`;
            }
          } else {
            // Hide action bar directly
            actionBar.style.height = '0px';
            actionBar.style.overflow = 'hidden';
            actionBar.style.opacity = '0';
            actionBar.classList.remove("p_xs", "is-visible", "show-action-card");
            actionBar.classList.add("p_none");
          }
        });
      });
    }

    // Bind checkbox change handlers
    const checkboxLabels = table.querySelectorAll("label[data-row-id]");
    checkboxLabels.forEach((label) => {
      const checkbox = label.querySelector("input[type='checkbox']");
      if (!checkbox) return;

      // Remove any existing event listeners
      const newCheckbox = checkbox.cloneNode(true);
      checkbox.parentNode.replaceChild(newCheckbox, checkbox);

      // Add our event listener
      newCheckbox.addEventListener("change", (event) => {
        this.handleCheckboxClick(event);
      });
    });

    // Bind nested row expansion logic
    const nestedButtons = table.querySelectorAll("[data-advanced-table]");
    nestedButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const isExpanded =
          button.querySelector(UP_ARROW_SELECTOR).style.display === "inline-block";
        if (isExpanded) {
          tableData.expandedRows.add(button.id);
        } else {
          tableData.expandedRows.delete(button.id);
        }
      });
    });

    // Bind select-all logic
    const selectAllCheckbox = table.querySelector("#select-all-rows");
    if (selectAllCheckbox) {
      // Remove any existing event listeners
      const newSelectAllCheckbox = selectAllCheckbox.cloneNode(true);
      selectAllCheckbox.parentNode.replaceChild(newSelectAllCheckbox, selectAllCheckbox);

      // Add our event listener
      newSelectAllCheckbox.addEventListener("change", () => {
        const checkboxInput = newSelectAllCheckbox.querySelector('input[type="checkbox"]');
        const checkAll = checkboxInput.checked;

        const checkboxes = Array.from(
          table.querySelectorAll("label[data-row-id] input[type='checkbox']")
        );

        checkboxes.forEach((cb) => {
          cb.checked = checkAll;
          const rowId = cb.id;
          const rowEl = cb.closest("tr");

          if (checkAll) {
            tableData.selectedRows.add(rowId);
            rowEl?.classList.add("bg-row-selection");
            rowEl?.classList.remove("bg-white", "bg-silver");
          } else {
            tableData.selectedRows.delete(rowId);
            rowEl?.classList.remove("bg-row-selection");
            rowEl?.classList.add("bg-white");
          }
        });

        checkboxes.forEach((cb) => this.updateParentCheckboxes(cb));

        this.updateTableSelectedRowsAttribute();
      });
    }

    // Mark table as initialized
    tableData.initialized = true;
  }

  hideCloseIcon() {
    const closeIcon = this.element.querySelector(UP_ARROW_SELECTOR);
    closeIcon.style.display = "none";
  }

  showElement(elements, expandedRows) {
    elements.forEach((elem) => {
      elem.style.display = "table-row";
      elem.classList.add("is-visible");
      const childRowsAll = this.element
        .closest("table")
        .querySelectorAll(
          `[data-advanced-table-content^="${elem.dataset.advancedTableContent}-"]`
        );

      childRowsAll.forEach((childRow) => {
        const dataContent = childRow.dataset.advancedTableContent;

        if (!dataContent) {
          return;
        }
        // Split the dataContent to get all ancestor IDs, check against ExpandedRows
        const ancestorIds = dataContent.split("-").slice(0, -1);

        const prefixedAncestorIds = ancestorIds.map(
          (id) => `${childRow.id}_${id}`
        );
        const allAncestorsExpanded = prefixedAncestorIds.every((id) =>
          expandedRows.has(id)
        );

        const checkIfParentIsExpanded = () => {
          if (dataContent.endsWith("sr")) {
            const parentRowId = childRow.dataset.rowParent;
            const isParentVisible =
              childRow.previousElementSibling.classList.contains("is-visible");
            if (parentRowId) {
              const isInSet = expandedRows.has(parentRowId);
              if (isInSet && isParentVisible) {
                return true;
              }
            }
          }
          return false;
        };

        if (allAncestorsExpanded || checkIfParentIsExpanded()) {
          childRow.style.display = "table-row";
          childRow.classList.add("is-visible");
        } else {
          childRow.style.display = "none";
          childRow.classList.remove("is-visible");
        }
      });
    });
  }

  hideElement(elements, expandedRows) {
    elements.forEach((elem) => {
      elem.style.display = "none";
      elem.classList.remove("is-visible");

      // Remove the row ID from expandedRows when this row is hidden
      if (expandedRows.has(elem.id)) {
        expandedRows.delete(elem.id);
      }

      const childrenArray = elem.dataset.advancedTableContent.split("-");
      const currentDepth = parseInt(elem.dataset.rowDepth);
      if (childrenArray.length > currentDepth) {
        // Find the child rows corresponding to this parent row
        const childRows = this.element
          .closest("table")
          .querySelectorAll(
            `[data-advanced-table-content^="${elem.dataset.advancedTableContent}-"]`
          );

        childRows.forEach((childRow) => {
          childRow.style.display = "none";
          childRow.classList.remove("is-visible");
        });
      }
    });
  }

  toggleElement(elements, expandedRows) {
    if (!elements.length) return;

    const isVisible = elements[0].classList.contains("is-visible");

    isVisible ? this.hideElement(elements, expandedRows) : this.showElement(elements, expandedRows);
    isVisible ? this.displayDownArrow() : this.displayUpArrow();

    const row = this.element.closest("tr");
    if (row) {
      row.classList.toggle("bg-silver", !isVisible);
      row.classList.toggle("bg-white", isVisible);
    }
  }

  displayDownArrow() {
    this.element.querySelector(DOWN_ARROW_SELECTOR).style.display =
      "inline-block";
    this.element.querySelector(UP_ARROW_SELECTOR).style.display = "none";
  }

  displayUpArrow() {
    this.element.querySelector(UP_ARROW_SELECTOR).style.display =
      "inline-block";
    this.element.querySelector(DOWN_ARROW_SELECTOR).style.display = "none";
  }

  handleToggleAllHeaders(element) {
    const tableContainer = element.closest(".pb_advanced_table");
    if (!tableContainer || !tableContainer.id) return;

    const tableData = this.getTableData(tableContainer.id);

    const table = element.closest(".pb_table");
    const firstLevelButtons = table.querySelectorAll(
      ".pb_advanced_table_body > .pb_table_tr[data-row-depth='0'] [data-advanced-table]"
    );

    const allExpanded = Array.from(firstLevelButtons).every(
      (button) =>
        button.querySelector(UP_ARROW_SELECTOR).style.display === "inline-block"
    );

    if (allExpanded) {
      firstLevelButtons.forEach((button) => {
        button.click();
        tableData.expandedRows.delete(button.id);
      });
    } else {
      firstLevelButtons.forEach((button) => {
        if (!tableData.expandedRows.has(button.id)) {
          button.click();
          tableData.expandedRows.add(button.id);
        }
      });

      tableData.expandedRows.forEach((rowId) => {
        const nestedButton = table.querySelector(
          `[data-advanced-table][id="${rowId}"]`
        );
        if (nestedButton && !firstLevelButtons.contains(nestedButton)) {
          nestedButton.click();
        }
      });
    }
  }

  handleToggleAllSubRows(element, rowDepth) {
    const tableContainer = element.closest(".pb_advanced_table");
    if (!tableContainer || !tableContainer.id) return;

    const tableData = this.getTableData(tableContainer.id);

    const table = element.closest(".pb_table");
    const parentRow = element.closest("tr");
    if (!parentRow) {
      return;
    }
    const rowParentId = parentRow.dataset.rowParent;
    // Select all buttons that for subrows at that depth and with same rowParent
    const subRowButtons = table.querySelectorAll(
      `.pb_advanced_table_body > .pb_table_tr[data-row-depth='${rowDepth}'].pb_table_tr[data-row-parent='${rowParentId}'] [data-advanced-table]`
    );

    const allExpanded = Array.from(subRowButtons).every(
      (button) =>
        button.querySelector(UP_ARROW_SELECTOR).style.display === "inline-block"
    );

    if (allExpanded) {
      subRowButtons.forEach((button) => {
        button.click();
        tableData.expandedRows.delete(button.id);
      });
    } else {
      subRowButtons.forEach((button) => {
        if (!tableData.expandedRows.has(button.id)) {
          button.click();
          tableData.expandedRows.add(button.id);
        }
      });
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const advancedTables = document.querySelectorAll('.pb_advanced_table');

  // Initialize each table and its action bar
  advancedTables.forEach(table => {
    if (!table.id) return; // Skip tables without IDs

    // Initialize action bar
    const actionBar = table.querySelector('.row-selection-actions-card');
    if (actionBar) {
      // Direct styling override
      Object.assign(actionBar.style, {
        height: '0px',
        overflow: 'hidden',
        display: 'block',
        opacity: '0'
      });

      // Remove any visibility classes
      actionBar.classList.remove("p_xs", "is-visible", "show-action-card");
      actionBar.classList.add("p_none");

      // Direct DOM manipulation for checkboxes - exclude select-all checkbox
      const checkboxes = table.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          // Get all checked checkboxes
          const allCheckedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);

          // Filter out the select-all checkbox
          const selectedRowCheckboxes = allCheckedCheckboxes.filter(cb => {
            return cb.id !== 'select-all-rows' && !cb.closest('#select-all-rows');
          });

          // Get the selected count (excluding select-all)
          const selectedCount = selectedRowCheckboxes.length;

          if (selectedCount > 0) {
            // Show action bar directly
            actionBar.style.height = 'auto';
            actionBar.style.overflow = 'visible';
            actionBar.style.opacity = '1';
            actionBar.classList.remove("p_none");
            actionBar.classList.add("p_xs", "is-visible", "show-action-card");

            // Update the count
            const countElement = actionBar.querySelector(".selected-count");
            if (countElement) {
              countElement.textContent = `${selectedCount} Selected`;
            }
          } else {
            // Hide action bar directly
            actionBar.style.height = '0px';
            actionBar.style.overflow = 'hidden';
            actionBar.style.opacity = '0';
            actionBar.classList.add("p_none");
            actionBar.classList.remove("p_xs", "is-visible", "show-action-card");
          }
        });
      });
    }
  });
});

window.expandAllRows = (element) => {
  const table = element.closest('.pb_advanced_table');
  if (!table) return;

  const pbAdvancedTable = new PbAdvancedTable();
  pbAdvancedTable.element = element;
  pbAdvancedTable.handleToggleAllHeaders(element);
};

window.expandAllSubRows = (element, rowDepth) => {
  const table = element.closest('.pb_advanced_table');
  if (!table) return;

  const pbAdvancedTable = new PbAdvancedTable();
  pbAdvancedTable.element = element;
  pbAdvancedTable.handleToggleAllSubRows(element, rowDepth);
};
