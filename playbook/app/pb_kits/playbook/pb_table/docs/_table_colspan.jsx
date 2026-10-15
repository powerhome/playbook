import React from 'react'

import Table from '../_table'

const TableSm = (props) => {
  return (
    <Table
        size="sm"
        verticalBorder
        {...props}
    >
      <Table.Head>
        <Table.Row>
          <Table.Header colSpan={2} 
              text="Column 1 (spans 2 columns)" 
              textAlign="center" 
          />
          <Table.Header text="Column 2" />
          <Table.Header text="Column 3" />
          <Table.Header text="Column 4" />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell text="Value 1" />
          <Table.Cell text="Value 2" />
          <Table.Cell text="Value 3" />
          <Table.Cell text="Value 4" />
          <Table.Cell text="Value 5" />
        </Table.Row>
        <Table.Row>
          <Table.Cell text="Value 1" />
          <Table.Cell text="Value 2" />
          <Table.Cell text="Value 3" />
          <Table.Cell  colSpan={2}
              text="Value 4 (spans 2 columns)"
              textAlign="center" 
          />
        </Table.Row>
        <Table.Row>
          <Table.Cell text="Value 1" />
          <Table.Cell text="Value 2" />
          <Table.Cell text="Value 3" />
          <Table.Cell text="Value 4" />
          <Table.Cell text="Value 5" />
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default TableSm
