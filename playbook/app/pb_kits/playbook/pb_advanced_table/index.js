import PbEnhancedElement from "../pb_enhanced_element";

const ADVANCED_TABLE_SELECTOR = "[data-advanced-table]";
const DOWN_ARROW_SELECTOR = "#advanced-table_open_icon";
const UP_ARROW_SELECTOR = "#advanced-table_close_icon";

export default class PbAdvancedTable extends PbEnhancedElement {
  static get selector() {
    return ADVANCED_TABLE_SELECTOR;
  }

  updateTableSelectedRowsAttribute() {
    const mainTable = this.element.closest(".pb_advanced_table");
    mainTable.dataset.selectedRows = JSON.stringify(Array.from(PbAdvancedTable.selectedRows));
  }

  updateParentCheckboxes(checkbox) {
    const rowEl = checkbox.closest("tr");
    if (!rowEl) return;

    const table = rowEl.closest("table");
    if (!table) return;

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
        PbAdvancedTable.selectedRows.add(parentCheckboxId);
      } else {
        PbAdvancedTable.selectedRows.delete(parentCheckboxId);
      }
    });
  }

  handleCheckboxClick(event) {
    const checkbox = event.currentTarget;
    const rowId = checkbox.id;
    const isChecked = checkbox.checked;

    if (isChecked) {
      PbAdvancedTable.selectedRows.add(rowId);
    } else {
      PbAdvancedTable.selectedRows.delete(rowId);
    }
    const rowEl = checkbox.closest("tr");
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
          if (isChecked) {
            PbAdvancedTable.selectedRows.add(childRowId);
          } else {
            PbAdvancedTable.selectedRows.delete(childRowId);
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

  static expandedRows = new Set();
  static selectedRows = new Set();
  static isCollapsing = false;

  connect() {
    this.element.addEventListener("click", () => {
      if (!PbAdvancedTable.isCollapsing) {
        const isExpanded =
          this.element.querySelector(UP_ARROW_SELECTOR).style.display ===
          "inline-block";
        if (!isExpanded) {
          PbAdvancedTable.expandedRows.add(this.element.id);
        } else {
          PbAdvancedTable.expandedRows.delete(this.element.id);
        }
        this.toggleElement(this.target);
      }
    });
  
    this.hideCloseIcon();
  
    const table = this.element.closest("table");
  
    // 🧠 Prevent duplicate initialization
    if (table.dataset.pbAdvancedTableInitialized) return;
    table.dataset.pbAdvancedTableInitialized = "true";
  
    // Bind checkbox change handlers for all row checkboxes
    const checkboxLabels = table.querySelectorAll("label[data-row-id]");
    checkboxLabels.forEach((label) => {
      const checkbox = label.querySelector("input[type='checkbox']");
      if (!checkbox) return;
      checkbox.addEventListener("change", (event) => {
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
          PbAdvancedTable.expandedRows.add(button.id);
        } else {
          PbAdvancedTable.expandedRows.delete(button.id);
        }
      });
    });
  
    // Bind select-all logic for this table
    const selectAllCheckbox = table.querySelector("#select-all-rows");
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener("change", () => {
        const checkboxInput = selectAllCheckbox.querySelector('input[type="checkbox"]');
        const checkAll = checkboxInput.checked;
  
        const checkboxes = Array.from(
          table.querySelectorAll("label[data-row-id] input[type='checkbox']")
        );
  
        checkboxes.forEach((cb) => {
          cb.checked = checkAll;
          const rowId = cb.id;
          if (checkAll) {
            PbAdvancedTable.selectedRows.add(rowId);
          } else {
            PbAdvancedTable.selectedRows.delete(rowId);
          }
        });
  
        checkboxes.forEach((cb) => this.updateParentCheckboxes(cb));
  
        this.updateTableSelectedRowsAttribute();
      });
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

        const prefixedAncestorIds = ancestorIds.map(
          (id) => `${childRow.id}_${id}`
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
