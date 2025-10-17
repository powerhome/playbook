import PbEnhancedElement from "../pb_enhanced_element";
import { updateSelectionActionBar } from "./advanced_table_action_bar";

const ADVANCED_TABLE_SELECTOR = "[data-advanced-table]";
const DOWN_ARROW_SELECTOR = "#advanced-table_open_icon";
const UP_ARROW_SELECTOR = "#advanced-table_close_icon";

export default class PbAdvancedTable extends PbEnhancedElement {
  static get selector() {
    return ADVANCED_TABLE_SELECTOR;
  }

  static expandedRows = new Set();
  static selectedRows = new Set();
  static isCollapsing = false;

  constructor(...args) {
    super(...args);
    // Map parent row ID to array of its child rows
    this.childRowsMap = new Map();
  }

  // Fetch and cache child rows for a given parent row ID
  childRowsFor(parentId) {
    if (!this.childRowsMap.has(parentId)) {
      const table = this.element.closest("table");
      const rows = Array.from(
        table.querySelectorAll(`tr[data-row-parent="${parentId}"]`)
      );
      this.childRowsMap.set(parentId, rows);
    }
    return this.childRowsMap.get(parentId);
  }

  updateTableSelectedRowsAttribute() {
    const mainTable = this.element.closest(".pb_advanced_table");
    mainTable.dataset.selectedRows = JSON.stringify(
      Array.from(PbAdvancedTable.selectedRows)
    );
  }

  // Recalculate selected count based on all checked checkboxes
  recalculateSelectedCount() {
    const table = this.element.closest("table");
    
    // Get all checkboxes that could be part of the selection
    // This includes row checkboxes and any parent checkboxes that might be programmatically checked
    const rowCheckboxes = table.querySelectorAll(
      'label[data-row-id] input[type="checkbox"]'
    );
    
    // Also get any checkboxes that might be parent checkboxes (those with data-pb-checkbox-indeterminate-main)
    // But exclude the select-all checkbox itself from the count
    const parentCheckboxes = table.querySelectorAll(
      '[data-pb-checkbox-indeterminate-main="true"] input[type="checkbox"]'
    );
    
    // Filter out the select-all checkbox from parent checkboxes
    const selectAllCheckbox = table.querySelector('#select-all-rows input[type="checkbox"]');
    const filteredParentCheckboxes = Array.from(parentCheckboxes).filter(checkbox => 
      checkbox !== selectAllCheckbox && !checkbox.id.includes('select-all-rows')
    );
    
    // Combine all checkboxes and remove duplicates
    const allCheckboxes = new Set([...rowCheckboxes, ...filteredParentCheckboxes]);
    
    // Clear the selectedRows Set and rebuild it from checked checkboxes
    PbAdvancedTable.selectedRows.clear();
    
    allCheckboxes.forEach((checkbox) => {
      const rowEl = checkbox.closest("tr");
      const isChecked = checkbox.checked;
      
      if (isChecked) {
        PbAdvancedTable.selectedRows.add(checkbox.id);
        // Only apply styling if the checkbox is inside a table row
        if (rowEl) {
          rowEl.classList.add("bg-row-selection");
          rowEl.classList.remove("bg-white", "bg-silver");
        }
      } else {
        // Only apply styling if the checkbox is inside a table row
        if (rowEl) {
          rowEl.classList.remove("bg-row-selection");
          
          if (this.isRowExpanded(rowEl)) {
            rowEl.classList.remove("bg-silver");
            rowEl.classList.add("bg-white");
          } else {
            rowEl.classList.remove("bg-white");
            rowEl.classList.add("bg-silver");
          }
        }
      }
    });
    
    this.updateTableSelectedRowsAttribute();
    updateSelectionActionBar(table.closest(".pb_advanced_table"), PbAdvancedTable.selectedRows.size);
    
    // Sync header select-all state
    if (selectAllCheckbox) {
      selectAllCheckbox.checked = Array.from(rowCheckboxes).every((cb) => cb.checked);
    }
  }

  // Check if the row is expanded or collapsed
  // This is used to determine the background color of the row
  // when the checkbox is checked or unchecked
  isRowExpanded(rowEl) {
    const closeIcon = rowEl.querySelector(UP_ARROW_SELECTOR);
    return closeIcon?.style.display === "none" || !closeIcon;
  }

  handleCheckboxClick(event) {
    const checkbox = event.currentTarget;
    const rowId = checkbox.id;
    const isChecked = checkbox.checked;
    const rowEl = checkbox.closest("tr");

    if (isChecked) {
      PbAdvancedTable.selectedRows.add(rowId);
      rowEl.classList.add("bg-row-selection");
      rowEl.classList.remove("bg-white", "bg-silver");
    } else {
      PbAdvancedTable.selectedRows.delete(rowId);
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
    updateSelectionActionBar(table.closest(".pb_advanced_table"), PbAdvancedTable.selectedRows.size);
  }

  get target() {
    return this.childRowsFor(this.element.id) || [];
  }

  connect() {
    const table = this.element.closest("table");

    this.hideCloseIcon();
    const mainTable = this.element.closest(".pb_advanced_table");
    
    // This so it is hidden on first render
    if (mainTable) {
      updateSelectionActionBar(mainTable);
    }

    // Precompute parent→child rows mapping once
    table.querySelectorAll("tr[data-row-parent]").forEach((row) => {
      const parentId = row.dataset.rowParent;
      if (!this.childRowsMap.has(parentId)) {
        this.childRowsMap.set(parentId, []);
      }
      this.childRowsMap.get(parentId).push(row);
    });

    // Prevent duplicate initialization
    if (table.dataset.pbAdvancedTableInitialized) return;
    table.dataset.pbAdvancedTableInitialized = "true";

    // Delegate checkbox changes
    table.addEventListener("change", (event) => {
      const checkbox = event.target.closest('input[type="checkbox"]');
      if (!checkbox) return;

      // Header "select-all" logic
      if (checkbox.closest("#select-all-rows")) {
        const checkAll = checkbox.checked;
        const rowCheckboxes = table.querySelectorAll(
          'label[data-row-id] input[type="checkbox"]'
        );
        rowCheckboxes.forEach((cb) => {
          if (cb.checked !== checkAll) {
            cb.checked = checkAll;
            this.handleCheckboxClick({ currentTarget: cb });
          }
        });
        
        // Recalculate the count to ensure all checkboxes are properly tracked
        setTimeout(() => {
          this.recalculateSelectedCount();
        }, 0);
        return;
      }

      // Individual row checkbox logic
      const rowLabel = checkbox.closest("label[data-row-id]");
      if (rowLabel) {
        this.handleCheckboxClick({ currentTarget: checkbox });
        
        // Recalculate the count to ensure all checkboxes are properly tracked
        setTimeout(() => {
          this.recalculateSelectedCount();
        }, 0);
      }
    });

    // If a parent checkbox changed a checkbox, update styling
    // Listen for programmatic checkbox changes from parent-child relationships
    table.addEventListener("checkbox-programmatic-change", (event) => {
      const checkbox = event.target;
      if (!checkbox || checkbox.type !== 'checkbox') return;

      // Individual row checkbox logic
      const rowLabel = checkbox.closest("label[data-row-id]");
      if (rowLabel) {
        this.handleCheckboxClick({ currentTarget: checkbox });
      }
      
      // Recalculate the count to ensure all programmatically changed checkboxes are included
      setTimeout(() => {
        this.recalculateSelectedCount();
      }, 10); // Slightly longer delay to ensure all changes are processed
    });


    // Also listen for all checkbox changes to ensure we catch everything
    table.addEventListener("change", (event) => {
      const checkbox = event.target;
      if (checkbox && checkbox.type === 'checkbox') {
        // Force recalculation after a short delay to ensure all changes are processed
        setTimeout(() => {
          this.recalculateSelectedCount();
        }, 50);
      }
    });

    // Delegate expand/collapse toggles
    table.addEventListener("click", (event) => {
      const toggleBtn = event.target.closest("[data-advanced-table]");
      if (!toggleBtn || PbAdvancedTable.isCollapsing) return;

      // Temporarily bind `this.element` to the clicked toggle
      const prevElement = this.element;
      this.element = toggleBtn;

      // Update expandedRows set
      const isExpanded =
        toggleBtn.querySelector(UP_ARROW_SELECTOR).style.display ===
        "inline-block";
      if (!isExpanded) {
        PbAdvancedTable.expandedRows.add(toggleBtn.id);
      } else {
        PbAdvancedTable.expandedRows.delete(toggleBtn.id);
      }

      // Find direct child rows
      const childRows = Array.from(
        table.querySelectorAll(`[data-row-parent="${toggleBtn.id}"]`)
      );
      this.toggleElement(childRows);

      // Restore original element context
      this.element = prevElement;
    });

    this.addBorderRadiusOnLastVisibleRow();
  }

  addBorderRadiusOnLastVisibleRow() {
    const parentElement = this.element.closest(".pb_advanced_table");

    const table = document.getElementById(parentElement.id);

    if (table) {
      const visibleRows = table.querySelectorAll(
        "tr.is-visible, tr:not(.toggle-content)"
      );

      visibleRows.forEach((row) => {
        row.classList.remove("last-visible-row");
        row.classList.remove("last-row-cell");
      });

      const lastVisibleRow = visibleRows[visibleRows.length - 1];

      if (lastVisibleRow) {
        lastVisibleRow.classList.add("last-visible-row");
        lastVisibleRow.classList.add("last-row-cell");
      }
    }
  }

  hideCloseIcon() {
    const closeIcon = this.element.querySelector(UP_ARROW_SELECTOR);
    closeIcon.style.display = "none";
  }

  showElement(elements) {
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

        // Get the table_id from the child row's parent to construct proper prefixed IDs
        const parentRowId = childRow.dataset.rowParent;
        const tableId = parentRowId ? parentRowId.split('_').slice(0, -1).join('_') : '';

        const prefixedAncestorIds = ancestorIds.map(
          (id) => `${tableId}_${id}`
        );
        const allAncestorsExpanded = prefixedAncestorIds.every((id) =>
          PbAdvancedTable.expandedRows.has(id)
        );

        const checkIfParentIsExpanded = () => {
          if (dataContent.endsWith("sr")) {
            const parentRowId = childRow.dataset.rowParent;
            const isParentVisible =
              childRow.previousElementSibling.classList.contains("is-visible");
            if (parentRowId) {
              const isInSet = PbAdvancedTable.expandedRows.has(parentRowId);
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

  hideElement(elements) {
    elements.forEach((elem) => {
      elem.style.display = "none";
      elem.classList.remove("is-visible");

      // Remove the row ID from expandedRows when this row is hidden
      if (PbAdvancedTable.expandedRows.has(elem.id)) {
        PbAdvancedTable.expandedRows.delete(elem.id);
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

  toggleElement(elements) {
    if (!elements.length) return;

    const isVisible = elements[0].classList.contains("is-visible");

    isVisible ? this.hideElement(elements) : this.showElement(elements);
    isVisible ? this.displayDownArrow() : this.displayUpArrow();

    const row = this.element.closest("tr");
    if (row) {
      row.classList.toggle("bg-silver", !isVisible);
      row.classList.toggle("bg-white", isVisible);
    }

    this.addBorderRadiusOnLastVisibleRow();
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

  static handleToggleAllHeaders(element) {
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
        PbAdvancedTable.expandedRows.delete(button.id);
      });
    } else {
      firstLevelButtons.forEach((button) => {
        if (!PbAdvancedTable.expandedRows.has(button.id)) {
          button.click();
          PbAdvancedTable.expandedRows.add(button.id);
        }
      });

      PbAdvancedTable.expandedRows.forEach((rowId) => {
        const nestedButton = table.querySelector(
          `[data-advanced-table][id="${rowId}"]`
        );
        if (nestedButton && !firstLevelButtons.contains(nestedButton)) {
          nestedButton.click();
        }
      });
    }
  }

  static handleToggleAllSubRows(element, rowDepth) {
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
        PbAdvancedTable.expandedRows.delete(button.id);
      });
    } else {
      subRowButtons.forEach((button) => {
        if (!PbAdvancedTable.expandedRows.has(button.id)) {
          button.click();
          PbAdvancedTable.expandedRows.add(button.id);
        }
      });
    }
  }
}

window.expandAllRows = (element) => {
  PbAdvancedTable.handleToggleAllHeaders(element);
};

window.expandAllSubRows = (element, rowDepth) => {
  PbAdvancedTable.handleToggleAllSubRows(element, rowDepth);
};
