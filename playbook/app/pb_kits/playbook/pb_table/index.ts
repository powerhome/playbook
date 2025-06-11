import PbEnhancedElement from '../pb_enhanced_element'

const TABLE_WRAPPER_SELECTOR = "[data-pb-table-wrapper]";
const TABLE_COLLAPSIBLE_WRAPPER_SELECTOR = "[data-pb-table-collapsible-wrapper]";
const TABLE_COLLAPSIBLE_CELL_SELECTOR = "[data-pb-table-collapsible-cell-id]";

export default class PbTable extends PbEnhancedElement {
  stickyLeftColumns: string[] = [];
  stickyRightColumns: string[] = [];
  stickyRightColumnsReversed: string[] = [];

  static get selector(): string {
    return TABLE_WRAPPER_SELECTOR;
  }

  connect() {
    if (this.element.classList.contains('table-responsive-collapse')) {
      const headers: string[] = [];

      [].forEach.call(this.element.querySelectorAll('th'), (header: HTMLTableCellElement) => {
        const colSpan = header.colSpan
        for (let i = 0; i < colSpan; i++) {
          headers.push(header.textContent.replace(/\r?\n|\r/, ''));
        }
      });

      [].forEach.call(this.element.querySelectorAll('tbody tr'), (row: HTMLTableRowElement) => {
        [].forEach.call(row.cells, (cell: HTMLTableCellElement, headerIndex: number) => {
          cell.setAttribute('data-title', headers[headerIndex])
        })
      })
    }

    this.initStickyLeftColumns();
    this.initStickyRightColumns();
    this.handleCollapsibleClick();
    this.handleCollapsibleRow();
  }

  initStickyLeftColumns() {
    const table = this.element.querySelector('.sticky-left-column');

    if (table) {
      const classList = Array.from(table.classList);
      const stickyColumnClass = classList.find(cls => cls.startsWith('sticky-left-columns-ids-'));

      if (stickyColumnClass) {
        this.stickyLeftColumns = stickyColumnClass
          .replace('sticky-left-columns-ids-', '')
          .split('-');

        if (this.stickyLeftColumns.length > 0) {
          setTimeout(() => {
            this.handleStickyLeftColumns();
            window.addEventListener('resize', () => this.handleStickyLeftColumns());
          }, 10);
        }
      }
    }
  }

  handleStickyLeftColumns() {
    let accumulatedWidth = 0;

    this.stickyLeftColumns.forEach((colId, index) => {
      const isLastColumn = index === this.stickyLeftColumns.length - 1;
      const header = this.element.querySelector(`th[data-sticky-id="${colId}"]`);
      const cells = this.element.querySelectorAll(`td[data-sticky-id="${colId}"]`);

      if (header) {
        header.classList.add('sticky');
        (header as HTMLElement).style.left = `${accumulatedWidth}px`;

        if (!isLastColumn) {
          header.classList.add('with-border-right');
          header.classList.remove('sticky-left-shadow');
        } else {
          header.classList.remove('with-border-right');
          header.classList.add('sticky-left-shadow');
        }

        accumulatedWidth += (header as HTMLElement).offsetWidth;
      }

      cells.forEach((cell) => {
        cell.classList.add('sticky');
        (cell as HTMLElement).style.left = `${accumulatedWidth - (header as HTMLElement).offsetWidth}px`;

        if (!isLastColumn) {
          cell.classList.add('with-border-right');
          cell.classList.remove('sticky-left-shadow');
        } else {
          cell.classList.remove('with-border-right');
          cell.classList.add('sticky-left-shadow');
        }
      });
    });
  }

  initStickyRightColumns() {
    const table = this.element.querySelector('.sticky-right-column');

    if (table) {
      const classList = Array.from(table.classList);
      const stickyColumnClass = classList.find(cls => cls.startsWith('sticky-right-columns-ids-'));

      if (stickyColumnClass) {
        this.stickyRightColumns = stickyColumnClass
          .replace('sticky-right-columns-ids-', '')
          .split('-');
        this.stickyRightColumnsReversed = this.stickyRightColumns.reverse();

        if (this.stickyRightColumns.length > 0) {
          setTimeout(() => {
            this.handleStickyRightColumns();
            window.addEventListener('resize', () => this.handleStickyRightColumns());
          }, 10);
        }
      }
    }
  }

  handleStickyRightColumns() {
    let accumulatedWidth = 0;

    this.stickyRightColumnsReversed.forEach((colId, index) => {
      const isLastColumn = index === this.stickyRightColumns.length - 1;
      const header = this.element.querySelector(`th[data-sticky-id="${colId}"]`);
      const cells = this.element.querySelectorAll(`td[data-sticky-id="${colId}"]`);

      if (header) {
        header.classList.add('sticky');
        (header as HTMLElement).style.right = `${accumulatedWidth}px`;

        if (!isLastColumn) {
          header.classList.add('with-border-left');
          header.classList.remove('sticky-right-shadow');
        } else {
          header.classList.remove('with-border-right');
          header.classList.add('sticky-right-shadow');
        }

        accumulatedWidth += (header as HTMLElement).offsetWidth;
      }

      cells.forEach((cell) => {
        cell.classList.add('sticky');
        (cell as HTMLElement).style.right = `${accumulatedWidth - (header as HTMLElement).offsetWidth}px`;

        if (!isLastColumn) {
          cell.classList.add('with-border-left');
          cell.classList.remove('sticky-right-shadow');
        } else {
          cell.classList.remove('with-border-left');
          cell.classList.add('sticky-right-shadow');
        }
      });
    });
  }

  handleCollapsibleClick() {
    const cells = this.element.querySelectorAll(TABLE_COLLAPSIBLE_CELL_SELECTOR);
    const collapsibleElements = this.element.querySelectorAll(TABLE_COLLAPSIBLE_WRAPPER_SELECTOR);

    if (cells.length > 0) {
      cells.forEach((cell) => {
        const cellId = (cell as HTMLElement).dataset.pbTableCollapsibleCellId;

        Array.from(cell.children).forEach((child) => {
          if (child.id === cellId) {
            Array.from(child.children).forEach((svgChild) => {
              svgChild.id = cellId; // Assign cellId to SVG child
              Array.from(svgChild.children).forEach((pathChild) => {
                pathChild.id = cellId; // Assign cellId to path child
              });
            });
          }
        });
        cell.addEventListener('click', (event) => {
          if ((event.target as HTMLElement).id) {
            document.dispatchEvent(new CustomEvent(`collapsed-toggle${(event.currentTarget as HTMLElement).id}`));

            const toggleElements = this.element.querySelectorAll(`.collapsible_border_toggle${(event.currentTarget as HTMLElement).id}`);
            toggleElements.forEach((element) => {
              element.classList.toggle('no-border');
              element.classList.toggle('border-active');
            });
          }
        });
      });

    } else {
      collapsibleElements.forEach((collapsibleElement) => {
        collapsibleElement.addEventListener('click', (event) => {
          document.dispatchEvent(new CustomEvent(`collapsed-toggle${(event.currentTarget as HTMLElement).id}`))

          const toggleElements = this.element.querySelectorAll(`.collapsible_border_toggle${(event.currentTarget as HTMLElement).id}`);
          toggleElements.forEach(element => {
            element.classList.toggle('no-border');
            element.classList.toggle('border-active');
          });
        })
      })
    }
  }

  handleCollapsibleRow() {
    const collapsibleRows = this.element.querySelectorAll('.pb_table_collapsible_row');
    if (collapsibleRows.length > 0) {
      collapsibleRows.forEach((row) => {
        const previousRow = row.previousElementSibling;

        if (
          previousRow &&
          previousRow.tagName === 'TR'
        ) {
          const tdCount = previousRow.querySelectorAll('td').length;
          const collapsibleTd = row.querySelector('td');
          if (collapsibleTd) {
            collapsibleTd.colSpan = tdCount;
          }
        } else {
          return
        }
      });
    }
  }

  // Cleanup method to remove event listener
  disconnect() {
    if (this.stickyLeftColumns.length > 0) {
      window.removeEventListener('resize', () => this.handleStickyLeftColumns());
    }

    if (this.stickyRightColumns.length > 0) {
      window.removeEventListener('resize', () => this.handleStickyRightColumns());
    }
  }
}
