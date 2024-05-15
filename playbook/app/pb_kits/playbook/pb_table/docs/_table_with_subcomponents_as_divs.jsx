import React from 'react'

import Table from '../_table'

const TableWithSubcomponentsAsDivs = (props) => {
  return (
    <Table
        size="sm"
        tag="div"
        {...props}
    >
      <Table.Head tag="div">
        <Table.Row tag="div">
          <Table.Header tag="div">{'Column 1'}</Table.Header>
          <Table.Header tag="div">{'Column 2'}</Table.Header>
          <Table.Header tag="div">{'Column 3'}</Table.Header>
          <Table.Header tag="div">{'Column 4'}</Table.Header>
          <Table.Header tag="div">{'Column 5'}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body tag="div">
        <Table.Row tag="div">
          <Table.Cell tag="div">{'Value 1'}</Table.Cell>
          <Table.Cell tag="div">{'Value 2'}</Table.Cell>
          <Table.Cell tag="div">{'Value 3'}</Table.Cell>
          <Table.Cell tag="div">{'Value 4'}</Table.Cell>
          <Table.Cell tag="div">{'Value 5'}</Table.Cell>
        </Table.Row>
        <Table.Row tag="div">
          <Table.Cell tag="div">{'Value 1'}</Table.Cell>
          <Table.Cell tag="div">{'Value 2'}</Table.Cell>
          <Table.Cell tag="div">{'Value 3'}</Table.Cell>
          <Table.Cell tag="div">{'Value 4'}</Table.Cell>
          <Table.Cell tag="div">{'Value 5'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell tag="div">{'Value 1'}</Table.Cell>
          <Table.Cell tag="div">{'Value 2'}</Table.Cell>
          <Table.Cell tag="div">{'Value 3'}</Table.Cell>
          <Table.Cell tag="div">{'Value 4'}</Table.Cell>
          <Table.Cell tag="div">{'Value 5'}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default TableWithSubcomponentsAsDivs
