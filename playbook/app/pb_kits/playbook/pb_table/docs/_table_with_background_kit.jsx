import React from 'react'

import Table from '../_table'
import Background from "../../pb_background/_background"

const TableWithBackgroundKit = (props) => {
  return (
    <div>
      <div>
        <Table
            {...props}
        >
          <Table.Head>
            <Table.Row>
              <Table.Header>{'Column 1'}</Table.Header>
              <Table.Header>{'Column 2'}</Table.Header>
              <Table.Header>{'Column 3'}</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Table.Row>
            <Background
                backgroundColor="error_subtle"
                tag="tr"
            >
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Background>
            <Table.Row>
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Table.Row>
            <Background
                backgroundColor="warning_subtle"
                tag="tr"
            >
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Background>
            <Table.Row>
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div>
        <Table
            paddingTop="sm"
            {...props}
        >
          <colgroup>
            <Background
                backgroundColor="error_subtle"
                tag="col"
            />
            <Background
                backgroundColor="info_subtle"
                tag="col"
            />
            <Background
                backgroundColor="warning_subtle"
                tag="col"
            />
          </colgroup>
          <Table.Head>
            <Table.Row>
              <Table.Header>{'Column 1'}</Table.Header>
              <Table.Header>{'Column 2'}</Table.Header>
              <Table.Header>{'Column 3'}</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{'Value 1'}</Table.Cell>
              <Table.Cell>{'Value 2'}</Table.Cell>
              <Table.Cell>{'Value 3'}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        </div>
    </div>
  )
}

export default TableWithBackgroundKit
