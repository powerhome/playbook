import PbEnhancedElement from "../pb_enhanced_element";
import { updateSelectionActionBar } from "./advanced_table_action_bar";

const FLAT_SELECTOR = "[data-flat-advanced-table-select='true']";
// const SELECT_ALL_SELECTOR = "#select-all-rows input[type='checkbox']";

export default class PbFlatAdvancedTable extends PbEnhancedElement {
  static get selector() {
    return FLAT_SELECTOR;
  }

  constructor(...args) {
    super(...args);
    // keep track of selected IDs per-table-instance
    // this.selectedRows = new Set();
  }

  connect() {
    const table = this.element.closest("table");
    if (!table || table.dataset.flatAdvancedInit) return;
    table.dataset.flatAdvancedInit = "true";

    // Reference to outer container for action bar
    const mainTable = this.element.closest(".pb_advanced_table");
    // This so it is hidden on first render
    if (mainTable) {
      updateSelectionActionBar(mainTable, 0);
    }

    // const updateCheckboxState = () => {
    //   // Sync dataset on main table
    //   if (mainTable) {
    //     mainTable.dataset.selectedRows = JSON.stringify(
    //       Array.from(this.selectedRows)
    //     );
    //     updateSelectionActionBar(mainTable, this.selectedRows.size);
    //   }
    // };

    // table.addEventListener("change", (e) => {
    //   const rowCb = e.target.closest(FLAT_SELECTOR + " input[type='checkbox']");
    //   const allCb = e.target.closest(SELECT_ALL_SELECTOR);
    //   if (!rowCb && !allCb) return;

    //   if (rowCb) {
    //     const id = rowCb.id;
    //     if (rowCb.checked) this.selectedRows.add(id);
    //     else this.selectedRows.delete(id);

    //     const tr = rowCb.closest("tr");
    //     tr?.classList.toggle("bg-row-selection", rowCb.checked);
    //     tr?.classList.toggle("bg-white", !rowCb.checked);

    //     // Sync header checkbox
    //     const header = table.querySelector(SELECT_ALL_SELECTOR);
    //     if (header) {
    //       const all = Array.from(
    //         table.querySelectorAll(FLAT_SELECTOR + " input[type='checkbox']")
    //       ).every((cb) => cb.checked);
    //       header.checked = all;
    //     }
    //   }

    //   if (allCb) {
    //     const checked = allCb.checked;
    //     Array.from(
    //       table.querySelectorAll(FLAT_SELECTOR + " input[type='checkbox']")
    //     ).forEach((cb) => {
    //       cb.checked = checked;
    //       const tr = cb.closest("tr");
    //       tr?.classList.toggle("bg-row-selection", checked);
    //       tr?.classList.toggle("bg-white", !checked);
    //       const id = cb.id;
    //       if (checked) this.selectedRows.add(id);
    //       else this.selectedRows.delete(id);
    //     });
    //   }

    //   updateCheckboxState();
    // });
  }
}
