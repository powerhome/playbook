import PbEnhancedElement from '../pb_enhanced_element'

export default class PbTable extends PbEnhancedElement {
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
    })
  }
}
