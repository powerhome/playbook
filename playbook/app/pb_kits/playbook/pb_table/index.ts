import PbEnhancedElement from '../pb_enhanced_element'
import {
  applyStickyColumns,
  scheduleStickyColumns,
} from './utilities/stickyColumns'

const TABLE_WRAPPER_SELECTOR = "[data-pb-table-wrapper]";
const TABLE_COLLAPSIBLE_WRAPPER_SELECTOR = "[data-pb-table-collapsible-wrapper]";
const TABLE_COLLAPSIBLE_CELL_SELECTOR = "[data-pb-table-collapsible-cell-id]";

export default class PbTable extends PbEnhancedElement {
  stickyLeftColumns: string[] = [];
  stickyRightColumns: string[] = [];
  private stickyTable: Element | null = null;
  private cancelStickySchedule: (() => void) | null = null;
  private stickyResizeObserver: ResizeObserver | null = null;
  private boundApplyStickyOffsets = () => this.applyStickyOffsets();

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

    this.initStickyColumns();
    this.handleCollapsibleClick();
    this.handleCollapsibleRow();
  }

  initStickyColumns() {
    const table =
      this.element.querySelector('.sticky-left-column, .sticky-right-column') ||
      (this.element.classList.contains('sticky-left-column') ||
      this.element.classList.contains('sticky-right-column')
        ? this.element
        : null);

    if (!table) return;

    this.stickyTable = table;
    const classList = Array.from(table.classList);
    const stickyLeftClass = classList.find(cls => cls.startsWith('sticky-left-columns-ids-'));
    const stickyRightClass = classList.find(cls => cls.startsWith('sticky-right-columns-ids-'));

    if (stickyLeftClass) {
      this.stickyLeftColumns = stickyLeftClass
        .replace('sticky-left-columns-ids-', '')
        .split('-');
    }

    if (stickyRightClass) {
      this.stickyRightColumns = stickyRightClass
        .replace('sticky-right-columns-ids-', '')
        .split('-');
    }

    if (!this.stickyLeftColumns.length && !this.stickyRightColumns.length) return;

    this.cancelStickySchedule = scheduleStickyColumns(this.boundApplyStickyOffsets);
    window.addEventListener('resize', this.boundApplyStickyOffsets);

    if (typeof ResizeObserver !== 'undefined') {
      this.stickyResizeObserver = new ResizeObserver(this.boundApplyStickyOffsets);
      this.stickyResizeObserver.observe(table);
    }
  }

  applyStickyOffsets() {
    if (!this.stickyTable) return;

    if (this.stickyLeftColumns.length) {
      applyStickyColumns(this.stickyTable, this.stickyLeftColumns, 'left');
    }

    if (this.stickyRightColumns.length) {
      applyStickyColumns(this.stickyTable, this.stickyRightColumns, 'right');
    }
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

  disconnect() {
    this.cancelStickySchedule?.();
    this.cancelStickySchedule = null;
    window.removeEventListener('resize', this.boundApplyStickyOffsets);
    this.stickyResizeObserver?.disconnect();
    this.stickyResizeObserver = null;
    this.stickyTable = null;
  }
}
