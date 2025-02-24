import React from 'react'

import Table from '../_table'
import Card from '../../pb_card/_card'
import Caption from '../../pb_caption/_caption'

const TableWithCustomHeader = (props) => {
  return (
    <>
        <Caption marginBottom="md"
            text="PB Wrapper Table"
        />
        <Table
            headerColor="category_13"
            headerStyle="borderless"
            size="sm"
            {...props}
        >
          <thead>
            <tr>
              <th>{'Column 1'}</th>
              <th>{'Column 2'}</th>
              <th>{'Column 3'}</th>
              <th>{'Column 4'}</th>
              <th>{'Column 5'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{'Value 1'}</td>
              <td>{'Value 2'}</td>
              <td>{'Value 3'}</td>
              <td>{'Value 4'}</td>
              <td>{'Value 5'}</td>
            </tr>
            <tr>
              <td>{'Value 1'}</td>
              <td>{'Value 2'}</td>
              <td>{'Value 3'}</td>
              <td>{'Value 4'}</td>
              <td>{'Value 5'}</td>
            </tr>
            <tr>
              <td>{'Value 1'}</td>
              <td>{'Value 2'}</td>
              <td>{'Value 3'}</td>
              <td>{'Value 4'}</td>
              <td>{'Value 5'}</td>
            </tr>
          </tbody>
        </Table>
        <Caption marginY="md"
            text="Subcomponent Table"
        />
        <Card background="light">
            <Table
                headerColor="success_subtle"
                headerStyle="borderless"
                size="sm"
                {...props}
            >
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
                  <Table.Cell>{'Value 1'}</Table.Cell>
                  <Table.Cell>{'Value 2'}</Table.Cell>
                  <Table.Cell>{'Value 3'}</Table.Cell>
                  <Table.Cell>{'Value 4'}</Table.Cell>
                  <Table.Cell>{'Value 5'}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{'Value 1'}</Table.Cell>
                  <Table.Cell>{'Value 2'}</Table.Cell>
                  <Table.Cell>{'Value 3'}</Table.Cell>
                  <Table.Cell>{'Value 4'}</Table.Cell>
                  <Table.Cell>{'Value 5'}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{'Value 1'}</Table.Cell>
                  <Table.Cell>{'Value 2'}</Table.Cell>
                  <Table.Cell>{'Value 3'}</Table.Cell>
                  <Table.Cell>{'Value 4'}</Table.Cell>
                  <Table.Cell>{'Value 5'}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
        </Card>
    </>
  )
}

export default TableWithCustomHeader
