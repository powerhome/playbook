import PbEnhancedElement from "../pb_enhanced_element";

const ADVANCED_TABLE_SELECTOR = "[data-advanced-table]";
const DOWN_ARROW_SELECTOR = "#advanced-table_open_icon";
const UP_ARROW_SELECTOR = "#advanced-table_close_icon";

export default class PbAdvancedTable extends PbEnhancedElement {
  static get selector() {
    return ADVANCED_TABLE_SELECTOR;
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
            
            const childRowId = childCheckbox.dataset.rowId;
            if (isChecked) {
              PbAdvancedTable.selectedRows.add(childRowId);
            } else {
              PbAdvancedTable.selectedRows.delete(childRowId);
            }
          });
        }
      }
      console.log(
        "Currently selected row IDs: ",
        Array.from(PbAdvancedTable.selectedRows)
      );
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

    const checkboxLabels = this.element
    .closest("table")
    .querySelectorAll("label[data-row-id]");
    checkboxLabels.forEach((label) => {
      const checkbox = label.querySelector("input[type='checkbox']");
      console.log("hello")

      if (!checkbox) return;
  
      checkbox.addEventListener("change", (event) => {
        this.handleCheckboxClick(event);
      });
    });
  

    const nestedButtons = this.element
      .closest("table")
      .querySelectorAll("[data-advanced-table]");
    nestedButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const isExpanded =
          button.querySelector(UP_ARROW_SELECTOR).style.display ===
          "inline-block";
        if (isExpanded) {
          PbAdvancedTable.expandedRows.add(button.id);
        } else {
          PbAdvancedTable.expandedRows.delete(button.id);
        }
      });
    });
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
