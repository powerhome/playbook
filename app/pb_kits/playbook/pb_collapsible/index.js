import PbEnhancedElement from '../pb_enhanced_element'

// const COLLAPSIBLE_SELECTOR = X

export default class PbCollapsible extends PbEnhancedElement {
  static get selector() {
    return 'yes' // console.log('Loaded JS')
    // '.table-responsive-collapse'
  }

  // connect() {
  //   const tables = document.querySelectorAll('.table-responsive-collapse');

  //   // Each Table
  //   [].forEach.call(tables, (table) => {
  //     // Header Titles
  //     var headers = [].map.call(table.querySelectorAll('th'), (header) => {
  //       return header.textContent.replace(/\r?\n|\r/, '')
  //     });

  //     // for each row in tbody
  //     [].forEach.call(table.querySelectorAll('tbody tr'), (row) => {
  //       // for each cell
  //       [].forEach.call(row.cells, (cell, headerIndex) => {
  //         // apply the attribute
  //         cell.setAttribute('data-title', headers[headerIndex])
  //       })
  //     })
  //   })
  // }
}
