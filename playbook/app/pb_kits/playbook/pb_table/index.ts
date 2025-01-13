import PbEnhancedElement from '../pb_enhanced_element'

export default class PbTable extends PbEnhancedElement {
    private stickyLeftColumns: string[] = [];
    private handleStickyColumnsRef: () => void;

    static get selector(): string {
      return '.table-responsive-collapse'
    }

    connect(): void {
      const tables = document.querySelectorAll('.table-responsive-collapse');
      // Each Table
      [].forEach.call(tables, (table: HTMLTableElement) => {
        // Header Titles
        const headers: string[] = [];
        [].forEach.call(table.querySelectorAll('th'), (header: HTMLTableCellElement) => {
            const colSpan = header.colSpan
            for (let i = 0; i < colSpan; i++) {
              headers.push(header.textContent.replace(/\r?\n|\r/, ''));
            }
        });
        // for each row in tbody
        [].forEach.call(table.querySelectorAll('tbody tr'), (row: HTMLTableRowElement) => {
          // for each cell
          [].forEach.call(row.cells, (cell: HTMLTableCellElement, headerIndex: number) => {
            // apply the attribute
            cell.setAttribute('data-title', headers[headerIndex])
          })
        })
      });

      // New sticky columns logic
      this.initStickyColumns();
      this.handleCollapsibleRow()
    }

    private initStickyColumns(): void {
      // Find tables with sticky-left-column class
      const tables = document.querySelectorAll('.sticky-left-column');

      tables.forEach((table) => {
        // Extract sticky left column IDs by looking at the component's class
        const classList = Array.from(table.classList);

        // Look for classes in the format sticky-left-column-{ids}
        const stickyColumnClass = classList.find(cls => cls.startsWith('sticky-columns-'));
        if (stickyColumnClass) {
          // Extract the IDs from the class name
          this.stickyLeftColumns = stickyColumnClass
              .replace('sticky-columns-', '')
              .split('-');

          if (this.stickyLeftColumns.length > 0) {
            setTimeout(() => {
              this.handleStickyColumnsRef = this.handleStickyColumns.bind(this);
              this.handleStickyColumns();
              window.addEventListener('resize', this.handleStickyColumnsRef);
            }, 10);
          }
        }
      });
    }

    private handleStickyColumns(): void {
      let accumulatedWidth = 0;

      this.stickyLeftColumns.forEach((colId, index) => {
        const isLastColumn = index === this.stickyLeftColumns.length - 1;
        const header = document.querySelector(`th[id="${colId}"]`);
        const cells = document.querySelectorAll(`td[id="${colId}"]`);

        if (header) {
          header.classList.add('sticky');
          (header as HTMLElement).style.left = `${accumulatedWidth}px`;

          if (!isLastColumn) {
            header.classList.add('with-border');
            header.classList.remove('sticky-shadow');
          } else {
            header.classList.remove('with-border');
            header.classList.add('sticky-shadow');
          }

          accumulatedWidth += (header as HTMLElement).offsetWidth;
        }

        cells.forEach((cell) => {
          cell.classList.add('sticky');
          (cell as HTMLElement).style.left = `${accumulatedWidth - (header as HTMLElement).offsetWidth}px`;

          if (!isLastColumn) {
            cell.classList.add('with-border');
            cell.classList.remove('sticky-shadow');
          } else {
            cell.classList.remove('with-border');
            cell.classList.add('sticky-shadow');
          }
        });
      });
    }

    handleCollapsibleRow() {
      // Use a flag on the `window` object to track execution
      if (window.isCollapsibleRowHandled) return;

      const collapsibleRows = document.querySelectorAll('.pb_table_collapsible_row');
      if (collapsibleRows.length > 0) {
        collapsibleRows.forEach((row) => {
          const previousRow = row.previousElementSibling;

          if (
            previousRow &&
            previousRow.tagName === 'TR'
          ) {
            const tdCount = previousRow.querySelectorAll('td').length;
            console.log(`Number of <td> elements in the previous <tr>: ${tdCount}`);

            // Set colSpan dynamically for the collapsible row
            const collapsibleTd = row.querySelector('td');
            if (collapsibleTd) {
              collapsibleTd.colSpan = tdCount;
            }
          } else {
            console.log('Previous row does not match collapsible conditions.');
          }
        });

        // Mark the logic as executed globally
        window.isCollapsibleRowHandled = true;
      }
    }
    
    // Cleanup method to remove event listener
    disconnect(): void {
      if (this.handleStickyColumnsRef) {
        window.removeEventListener('resize', this.handleStickyColumnsRef);
      }
    }
}