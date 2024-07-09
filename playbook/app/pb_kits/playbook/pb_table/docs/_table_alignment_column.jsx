import React from 'react'

import Table from '../_table'

const TableAlignmentColumn = (props) => {
  return (
    <Table
        {...props}
    >
        <Table.Head>
            <Table.Row>
                <Table.Header>{'Column 1'}</Table.Header>
                <Table.Header>{'Column 2'}</Table.Header>
                <Table.Header>{'Column 3'}</Table.Header>
                <Table.Header textAlign="center">{'Rating'}</Table.Header>
                <Table.Header textAlign="right">{'Money'}</Table.Header>
            </Table.Row>
        </Table.Head>
        <Table.Body>
            <Table.Row>
                <Table.Cell>{'Value 1'}</Table.Cell>
                <Table.Cell>{'Value 2'}</Table.Cell>
                <Table.Cell>{'Value 3'}</Table.Cell>
                <Table.Cell textAlign="center">{'3'}</Table.Cell>
                <Table.Cell textAlign="right">{'$57.32'}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>{'Value 1'}</Table.Cell>
                <Table.Cell>{'Value 2'}</Table.Cell>
                <Table.Cell>{'Value 3'}</Table.Cell>
                <Table.Cell textAlign="center">{'2'}</Table.Cell>
                <Table.Cell textAlign="right">{'$5,657.08'}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>{'Value 1'}</Table.Cell>
                <Table.Cell>{'Value 2'}</Table.Cell>
                <Table.Cell>{'Value 3'}</Table.Cell>
                <Table.Cell textAlign="center">{'4'}</Table.Cell>
                <Table.Cell textAlign="right">{'$358.77'}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>

  )
}

export default TableAlignmentColumn
