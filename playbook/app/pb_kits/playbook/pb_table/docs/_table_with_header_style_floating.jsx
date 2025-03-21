import React from 'react'

import Background from '../../pb_background/_background'
import Card from '../../pb_card/_card'
import Table from '../../pb_table/_table'

const TableWithHeaderStyleFloating = (props) => {
  return (
    <>
        <Card background="light" 
            {...props}
        >
            <Table
                headerStyle="floating"
                size="sm"
                {...props}
            >
              <Table.Head>
                  <Background backgroundColor="light" 
                      tag="tr"
                      {...props}
                  >
                      <Table.Header>{'Column 1'}</Table.Header>
                      <Table.Header>{'Column 2'}</Table.Header>
                      <Table.Header>{'Column 3'}</Table.Header>
                      <Table.Header>{'Column 4'}</Table.Header>
                      <Table.Header>{'Column 5'}</Table.Header>
                  </Background>
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

export default TableWithHeaderStyleFloating