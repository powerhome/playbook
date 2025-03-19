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
  static selectedRows = new Set();
  static selectedRowElements = new Map();

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
    this.setupRowSelection();
    this.initializeSelectionState();
  }

  setupRowSelection() {
    const selectAllCheckbox = this.element.closest("table").querySelector("#select-all-rows");
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener("change", this.handleSelectAllRows.bind(this));
      
      const rowCheckboxes = this.element.closest("table").querySelectorAll("[data-action='click->pb-advanced-table#toggleRowSelection']");
      rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", this.handleRowSelection.bind(this));
      });
    }
  }

  // handleSelectAllRows(event) {
  //   const checked = event.target.checked;
  //   const table = this.element.closest("table");
  //   const rowCheckboxes = table.querySelectorAll("[data-action='click->pb-advanced-table#toggleRowSelection']");
    
  //   rowCheckboxes.forEach(checkbox => {
  //     checkbox.checked = checked;
      
  //     const rowId = checkbox.dataset.rowId;
  //     if (checked) {
  //       PbAdvancedTable.selectedRows.add(rowId);
  //     } else {
  //       PbAdvancedTable.selectedRows.delete(rowId);
  //     }
      
  //     this.updateRowSelectedStyle(checkbox, checked);
  //   });
    
  //   this.dispatchSelectionChangeEvent();
  // }

  handleSelectAllRows(event) {
    const checked = event.target.checked;
    const table = this.element.closest("table");
    const rowCheckboxes = table.querySelectorAll("[data-action='click->pb-advanced-table#toggleRowSelection']");
    
    console.group("Select All Rows");
    console.log("Checkboxes found:", rowCheckboxes.length);
    console.log("Setting all to:", checked);
    console.groupEnd();
    
    if (!checked) {
      PbAdvancedTable.selectedRows.clear();
      PbAdvancedTable.selectedRowElements.clear();
    }
    
    rowCheckboxes.forEach(checkbox => {
      checkbox.checked = checked;
      
      let rowId = checkbox.dataset.rowId;
      if (!rowId) {
        const idMatch = checkbox.id && checkbox.id.match(/select-row-(\d+)/);
        const nameMatch = checkbox.name && checkbox.name.match(/select-row-(\d+)/);
        
        if (idMatch && idMatch[1]) {
          rowId = idMatch[1];
        } else if (nameMatch && nameMatch[1]) {
          rowId = nameMatch[1];
        } else {
          rowId = checkbox.id || checkbox.name;
        }
        
        checkbox.dataset.rowId = rowId;
      }
      
      if (checked) {
        PbAdvancedTable.selectedRows.add(rowId);
        PbAdvancedTable.selectedRowElements.set(rowId, checkbox.closest("tr"));
      }
      
      this.updateRowSelectedStyle(checkbox, checked);
    });
    
    this.dispatchSelectionChangeEvent();
  }

  handleRowSelection(event) {
    const checkbox = event.target;
    let rowId = checkbox.dataset.rowId;

    // checking checkbox.dataset.rowId for subrow
    console.group("Row Selection");
    console.log("Checkbox:", checkbox);
    console.log("Row ID from dataset:", rowId);
    console.log("Checkbox dataset:", checkbox.dataset);
    if (!rowId) {
      // Extract numeric part from IDs like "select-row-1"
      const idMatch = checkbox.id && checkbox.id.match(/select-row-(\d+)/);
      const nameMatch = checkbox.name && checkbox.name.match(/select-row-(\d+)/);
      
      if (idMatch && idMatch[1]) {
        rowId = idMatch[1];
        console.log("Extracted row ID from checkbox ID:", rowId);
      } else if (nameMatch && nameMatch[1]) {
        rowId = nameMatch[1];
        console.log("Extracted row ID from checkbox name:", rowId);
      } else {
        // As a last resort, use the checkbox ID or name directly
        rowId = checkbox.id || checkbox.name;
        console.log("Using checkbox ID/name as row ID:", rowId);
      }
      
      // Store the extracted ID back to the dataset for future use
      checkbox.dataset.rowId = rowId;
    }
    console.groupEnd();
    
    if (!rowId) {
      console.error("Row ID is missing for checkbox:", checkbox);
      return;
    }

    const checked = checkbox.checked;
    const row = checkbox.closest("tr");
    
    if (checked) {
      PbAdvancedTable.selectedRows.add(rowId);
      PbAdvancedTable.selectedRowElements.set(rowId, row);
      // Select all child rows
      this.selectChildRows(row, true);
    } else {
      PbAdvancedTable.selectedRows.delete(rowId);
      PbAdvancedTable.selectedRowElements.delete(rowId);
      // Deselect all child rows
      this.selectChildRows(row, false);
      
      // If this is a child row, check if we need to update the parent's checkbox
      this.updateParentRowSelection(row);
    }
    
    // Update the row styling for this row
    this.updateRowSelectedStyle(checkbox, checked);
    
    // Update select all checkbox state
    this.updateSelectAllCheckbox();
    this.refreshAllSelectedRowsVisualState();
    this.dispatchSelectionChangeEvent();
  }

  refreshAllSelectedRowsVisualState() {
    // For each selected row ID, ensure its visual state is correct
    PbAdvancedTable.selectedRows.forEach(rowId => {
      const row = PbAdvancedTable.selectedRowElements.get(rowId);
      if (row) {
        // Make sure the row has the selection class
        row.classList.add("bg-row-selection");
        row.classList.remove("bg-white");
        row.classList.remove("bg-silver");
        
        // Make sure the checkbox is checked
        const checkbox = row.querySelector("[data-action='click->pb-advanced-table#toggleRowSelection']");
        if (checkbox && !checkbox.checked) {
          checkbox.checked = true;
        }
      }
    });
  }

  selectChildRows(parentRow, checked) {
    if (!parentRow) return;
    
    // const table = this.element.closest("table");
    // const parentRowId = parentRow.querySelector("[data-action='click->pb-advanced-table#toggleRowSelection']")?.dataset.rowId;
    const parentCheckbox = parentRow.querySelector("[data-action='click->pb-advanced-table#toggleRowSelection']");
    if (!parentCheckbox) return;
    // console.group("Select Child Rows");
    // console.log("Parent Row:", parentRow);
    // console.log("Parent Checkbox:", parentCheckbox);
    // console.groupEnd();
    // if (!parentCheckbox) return;
  
    // const parentRowId = parentCheckbox.dataset.rowId;
    // if (!parentRowId) {
    //   console.error("Parent Row ID is missing for checkbox:", parentCheckbox);
    //   return;
    // }
    let parentRowId = parentCheckbox.dataset.rowId;
    if (!parentRowId) {
      const idMatch = parentCheckbox.id && parentCheckbox.id.match(/select-row-(\d+)/);
      const nameMatch = parentCheckbox.name && parentCheckbox.name.match(/select-row-(\d+)/);
      
      if (idMatch && idMatch[1]) {
        parentRowId = idMatch[1];
      } else if (nameMatch && nameMatch[1]) {
        parentRowId = nameMatch[1];
      } else {
        parentRowId = parentCheckbox.id || parentCheckbox.name;
      }
      
      // Store for future use
      parentCheckbox.dataset.rowId = parentRowId;
    }
    
    if (!parentRowId) return;

    // Find all child rows by checking for data attributes
    const childRows = this.findAllChildRows(parentRow);
    
    childRows.forEach(childRow => {
      const childCheckbox = childRow.querySelector("[data-action='click->pb-advanced-table#toggleRowSelection']");
      if (childCheckbox) {
      //   console.group("Processing Child Row");
      //   console.log("Child Row:", childRow);
      //   console.log("Child Checkbox:", childCheckbox);
      //   console.log("Child Row ID before:", childCheckbox.dataset.rowId);
      //   console.groupEnd();
      let childRowId = childCheckbox.dataset.rowId;
      if (!childRowId) {
        const idMatch = childCheckbox.id && childCheckbox.id.match(/select-row-(\d+)/);
        const nameMatch = childCheckbox.name && childCheckbox.name.match(/select-row-(\d+)/);
        
        if (idMatch && idMatch[1]) {
          childRowId = idMatch[1];
        } else if (nameMatch && nameMatch[1]) {
          childRowId = nameMatch[1];
        } else {
          childRowId = childCheckbox.id || childCheckbox.name;
        }
        
        childCheckbox.dataset.rowId = childRowId;
      }
      
      if (!childRowId) return;
      
      if (childCheckbox.checked !== checked) {
        childCheckbox.checked = checked;
        
        if (checked) {
          PbAdvancedTable.selectedRows.add(childRowId);
          PbAdvancedTable.selectedRowElements.set(childRowId, childRow);
        } else {
          PbAdvancedTable.selectedRows.delete(childRowId);
          PbAdvancedTable.selectedRowElements.delete(childRowId);
        }
        
        this.updateRowSelectedStyle(childCheckbox, checked);
      }
    }
    });
  }

  findAllChildRows(parentRow) {
    const table = this.element.closest("table");
    const parentRowId = parentRow.querySelector("[data-action='click->pb-advanced-table#toggleRowSelection']")?.dataset.rowId;
    if (!parentRowId) return [];
    
    // Find all rows that have this parent in their ancestry
    const expandButton = parentRow.querySelector(`[data-advanced-table][id$="${parentRowId}"]`);
    if (!expandButton) return [];
    
    const buttonId = expandButton.id;
    // Find all rows with this button as their parent
    const directChildRows = Array.from(table.querySelectorAll(`[data-row-parent="${buttonId}"]`));
    
    // Also include rows that have data-advanced-table-content that includes this row's ID
    const advancedTableContentRows = Array.from(table.querySelectorAll(`[data-advanced-table-content*="${parentRowId}"]`));
    
    // Combine and remove duplicates
    const allChildRows = [...new Set([...directChildRows, ...advancedTableContentRows])];
    
    return allChildRows;
  }

  updateParentRowSelection(childRow) {
    const table = this.element.closest("table");
    const rowDepth = parseInt(childRow.dataset.rowDepth || '0');
    
    if (rowDepth <= 0) return;
    
    const parentId = childRow.dataset.rowParent;
    if (!parentId) return;
    
    // Find the parent row
    const parentRow = table.querySelector(`tr:has([data-advanced-table][id="${parentId}"])`);
    if (!parentRow) return;
    
    const parentCheckbox = parentRow.querySelector("[data-action='click->pb-advanced-table#toggleRowSelection']");
    if (!parentCheckbox) return;
    
    // Check if all siblings are selected or deselected
    const siblingRows = this.findAllChildRows(parentRow);
    const allSiblingsSelected = siblingRows.every(row => {
      const checkbox = row.querySelector("[data-action='click->pb-advanced-table#toggleRowSelection']");
      return checkbox && checkbox.checked;
    });
    
    const anySiblingSelected = siblingRows.some(row => {
      const checkbox = row.querySelector("[data-action='click->pb-advanced-table#toggleRowSelection']");
      return checkbox && checkbox.checked;
    });
    
    // Update parent checkbox
    parentCheckbox.checked = allSiblingsSelected;
    parentCheckbox.indeterminate = anySiblingSelected && !allSiblingsSelected;
    
    // Update parent row styling and selection status
    if (allSiblingsSelected) {
      PbAdvancedTable.selectedRows.add(parentCheckbox.dataset.rowId);
      this.updateRowSelectedStyle(parentCheckbox, true);
    } else {
      PbAdvancedTable.selectedRows.delete(parentCheckbox.dataset.rowId);
      this.updateRowSelectedStyle(parentCheckbox, false);
    }
    
    // Recursively update parents of this parent
    this.updateParentRowSelection(parentRow);
  }

  updateRowSelectedStyle(checkbox, checked) {
    const row = checkbox.closest("tr");
    if (row) {
      const beforeClasses = [...row.classList];

      if (checked) {
        row.classList.add("bg-row-selection");
        row.classList.remove("bg-white");
        row.classList.remove("bg-silver");
      } else {
        row.classList.remove("bg-row-selection");
        const rowId = checkbox.dataset.rowId;
        const expandButton = row.querySelector(`[data-advanced-table][id$="${rowId}"]`);
        const isExpanded = expandButton && 
          expandButton.querySelector(UP_ARROW_SELECTOR) && 
          expandButton.querySelector(UP_ARROW_SELECTOR).style.display === "inline-block";
        
        if (isExpanded) {
          row.classList.add("bg-silver");
          row.classList.remove("bg-white");
        } else {
          row.classList.add("bg-white");
          row.classList.remove("bg-silver");
        }
      }
      const afterClasses = [...row.classList];
      console.log(`Row ${checkbox.dataset.rowId} style changed:`, {
        before: beforeClasses,
        after: afterClasses,
        checked: checked
      });
    }
  }
  
  initializeSelectionState() {
    const table = this.element.closest("table");
    const rowCheckboxes = table.querySelectorAll("[data-action='click->pb-advanced-table#toggleRowSelection']");
    
    PbAdvancedTable.selectedRows.clear();
    PbAdvancedTable.selectedRowElements.clear();
    
    rowCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        let rowId = checkbox.dataset.rowId;
        if (!rowId) {
          const idMatch = checkbox.id && checkbox.id.match(/select-row-(\d+)/);
          const nameMatch = checkbox.name && checkbox.name.match(/select-row-(\d+)/);
          
          if (idMatch && idMatch[1]) {
            rowId = idMatch[1];
          } else if (nameMatch && nameMatch[1]) {
            rowId = nameMatch[1];
          } else {
            rowId = checkbox.id || checkbox.name;
          }
          
          checkbox.dataset.rowId = rowId;
        }
        
        PbAdvancedTable.selectedRows.add(rowId);
        PbAdvancedTable.selectedRowElements.set(rowId, checkbox.closest("tr"));
        this.updateRowSelectedStyle(checkbox, true);
      }
    });
    
    this.updateSelectAllCheckbox();
  }

  updateSelectAllCheckbox() {
    const table = this.element.closest("table");
    const selectAllCheckbox = table.querySelector("#select-all-rows");
    const rowCheckboxes = table.querySelectorAll("[data-action='click->pb-advanced-table#toggleRowSelection']");
    
    if (selectAllCheckbox) {
      const allChecked = Array.from(rowCheckboxes).every(checkbox => checkbox.checked);
      const someChecked = Array.from(rowCheckboxes).some(checkbox => checkbox.checked);
      
      selectAllCheckbox.checked = allChecked;
      selectAllCheckbox.indeterminate = someChecked && !allChecked;
    }
  }

  dispatchSelectionChangeEvent() {
    // console.log("Selected Rows:", Array.from(PbAdvancedTable.selectedRows))
    // console.groupCollapsed("Selection Change Event");
    console.group("Selection Change Event");
    console.log("Selected Rows:", Array.from(PbAdvancedTable.selectedRows));
    console.log("Selected Count:", PbAdvancedTable.selectedRows.size);
    console.log("Selected Row Elements:", PbAdvancedTable.selectedRowElements);
    console.groupEnd();
    const event = new CustomEvent("pb-advanced-table:selection-change", {
      detail: {
        selectedRows: Array.from(PbAdvancedTable.selectedRows),
        selectedCount: PbAdvancedTable.selectedRows.size
      },
      bubbles: true
    });
    this.element.dispatchEvent(event);
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
      const rowCheckbox = row.querySelector("[data-action='click->pb-advanced-table#toggleRowSelection']");
      if (!rowCheckbox || !rowCheckbox.checked) {
        row.classList.toggle("bg-silver", !isVisible);
        row.classList.toggle("bg-white", isVisible);
      }
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
