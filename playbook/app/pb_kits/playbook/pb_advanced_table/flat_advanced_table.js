import PbEnhancedElement from "../pb_enhanced_element";

const FLAT_ADVANCED_TABLE_SELECTOR = "[data-flat-advanced-table-select]";

export default class PbFlatAdvancedTable extends PbEnhancedElement {
  static get selector() {
    return FLAT_ADVANCED_TABLE_SELECTOR;
  }

  get target() {
    const table = this.element.closest("table");
    return table.querySelectorAll(
      `"label[data-flat-advanced-table-select='true']"`
    );
  }

  static selectedRows = new Set();

  connect() {
    const table = this.element.closest("table");
    if (!table) return;
    const mainTable = this.element.closest(".pb_advanced_table");
    // Prevent double-init
    if (table.dataset.flatAdvancedTableInitialized) return;
    table.dataset.flatAdvancedTableInitialized = "true";

    const checkboxLabels = table.querySelectorAll(
      "label[data-flat-advanced-table-select='true']"
    );
    checkboxLabels.forEach((label) => {
      const checkbox = label.querySelector("input[type='checkbox']");
      if (!checkbox) return;
      checkbox.addEventListener("change", () => {
        const rowId = checkbox.id;
        const isChecked = checkbox.checked;
      
        if (isChecked) {
          PbFlatAdvancedTable.selectedRows.add(rowId);
        } else {
          PbFlatAdvancedTable.selectedRows.delete(rowId);
        }
      
        const allCheckboxes = table.querySelectorAll(
          "label[data-flat-advanced-table-select='true'] input[type='checkbox']"
        );
      
        const selectAllInput = table.querySelector(
          "#select-all-rows input[type='checkbox']"
        );
      
        if (selectAllInput) {
          const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
          selectAllInput.checked = allChecked;
        }
      
        mainTable.dataset.selectedRows = JSON.stringify(
          Array.from(PbFlatAdvancedTable.selectedRows)
        );
      });
      
    });

    // Handle select-all checkbox
    const selectAllWrapper = table.querySelector("#select-all-rows");
    if (selectAllWrapper) {
      const selectAllInput = selectAllWrapper.querySelector(
        'input[type="checkbox"]'
      );
      selectAllInput.addEventListener("change", () => {
        const checkAll = selectAllInput.checked;

        checkboxLabels.forEach((label) => {
          const cb = label.querySelector("input[type='checkbox']");
          cb.checked = checkAll;
          const rowId = cb.id;

          if (checkAll) {
            PbFlatAdvancedTable.selectedRows.add(rowId);
          } else {
            PbFlatAdvancedTable.selectedRows.delete(rowId);
          }
        });

        mainTable.dataset.selectedRows = JSON.stringify(
          Array.from(PbFlatAdvancedTable.selectedRows)
        );
      });
    }
  }
}
