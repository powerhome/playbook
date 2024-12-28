import PbEnhancedElement from "../pb_enhanced_element";

const ADVANCED_TABLE_SELECTOR = "[data-advanced-table]";
const DOWN_ARROW_SELECTOR = "#advanced-table_open_icon";
const UP_ARROW_SELECTOR = "#advanced-table_close_icon";

export default class PbAdvancedTable extends PbEnhancedElement {
  static get selector() {
    return ADVANCED_TABLE_SELECTOR;
  }

  get target() {
    const table = this.element.closest("table");
    return table.querySelectorAll(`[data-row-parent="${this.element.id}"]`);
  }

  static expandedRows = new Set();
  static isCollapsing = false;

  connect() {
    // Hide all child rows on initial load
    this.hideAllChildRows();

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

  hideAllChildRows() {
    const table = this.element.closest("table");
    const childRows = table.querySelectorAll(".toggle-content");
    childRows.forEach((row) => {
      row.style.display = "none";
      row.classList.remove("is-visible");
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
        if (PbAdvancedTable.expandedRows.has(childRow.dataset.rowParent)) {
          childRow.style.display = "table-row";
          childRow.classList.add("is-visible");
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
    if (isVisible) {
      this.hideElement(elements);
      this.displayDownArrow();
    } else {
      this.showElement(elements);
      this.displayUpArrow();
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
      ".pb_advanced_table_body > .pb_table_tr [data-advanced-table]"
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

  // static handleToggleAllSubRows(element, rowDepth) {}
}

window.expandAllRows = (element) => {
  PbAdvancedTable.handleToggleAllHeaders(element);
};
// window.expandAllSubRows = (element, rowDepth) => {
//   PbAdvancedTable.handleToggleAllSubRows(element, rowDepth);
// };
