import React from 'react'

import Table from '../_table'

const TableAlignmentShiftRow = (props) => {
  return (
    <Table {...props}>
  <Table.Head>
    <Table.Row>
      <Table.Header>{'Column 1'}</Table.Header>
      <Table.Header>{'Column 2'}</Table.Header>
      <Table.Header>{'Column 3'}</Table.Header>
      <Table.Header>{'Column 4'}</Table.Header>
      <Table.Header>{'Column 5'}</Table.Header>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        {'Value 1a'}
        <br />
        {'Value 1a'}
        <br />
        {'Value 1a'}
      </Table.Cell>
      <Table.Cell>{'Value 2a'}</Table.Cell>
      <Table.Cell>{'Value 3a'}</Table.Cell>
      <Table.Cell>{'Value 4a'}</Table.Cell>
      <Table.Cell>{'Value 5a'}</Table.Cell>
    </Table.Row>
    <Table.Row verticalAlign="middle">
      <Table.Cell>
        {'Value 1b'}
        <br />
        {'Value 1b'}
        <br />
        {'Value 1b'}
      </Table.Cell>
      <Table.Cell>{'Value 2b'}</Table.Cell>
      <Table.Cell>{'Value 3b'}</Table.Cell>
      <Table.Cell>{'Value 4b'}</Table.Cell>
      <Table.Cell>{'Value 5b'}</Table.Cell>
    </Table.Row>
    <Table.Row verticalAlign="bottom">
      <Table.Cell>
        {'Value 1c'}
        <br />
        {'Value 1c'}
        <br />
        {'Value 1c'}
      </Table.Cell>
      <Table.Cell>{'Value 2c'}</Table.Cell>
      <Table.Cell>{'Value 3c'}</Table.Cell>
      <Table.Cell>{'Value 4c'}</Table.Cell>
      <Table.Cell>{'Value 5c'}</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>

  )
}

export default TableAlignmentShiftRow
