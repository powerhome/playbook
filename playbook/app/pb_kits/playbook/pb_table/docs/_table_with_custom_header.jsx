import React from 'react'
import { Background, Caption, Card, Table } from 'playbook-ui'

const TableWithCustomHeader = (props) => {
  return (
    <>
        <Caption marginBottom="md"
            text="PB Wrapper Table borderless no background"
        />
        <Table
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
            text="PB Wrapper Table borderlessNested within Card"
        />
        <Card background="light" 
            {...props}
        >
            <Table
                headerStyle="borderlessNested"
                size="sm"
                {...props}
            >
              <thead>
                  <Background backgroundColor="light" 
                      tag="tr"
                      {...props}
                  >
                      <th>{'Column 1'}</th>
                      <th>{'Column 2'}</th>
                      <th>{'Column 3'}</th>
                      <th>{'Column 4'}</th>
                      <th>{'Column 5'}</th>
                  </Background>
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
        </Card>
        <Caption marginY="md"
            text="Subcomponent Table borderless no background"
        />
        <Table
            headerStyle="borderless"
            size="sm"
            verticalBorder
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
        <Caption marginY="md"
            text="Subcomponent Table borderlessNested within Card"
        />
        <Card background="light" 
            {...props}
        >
            <Table
                headerStyle="borderlessNested"
                size="sm"
                verticalBorder
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

export default TableWithCustomHeader
