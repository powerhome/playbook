import React from 'react'
import {Pill, Background, Table, Icon, Card} from "playbook-ui"

const TableWithCollapsibleWithNestedTable = (props) => {

  const Content = () => {
    return (
      <Card borderNone 
          color="light" 
          padding="none"
      >
        <Table size="sm">
          <Table.Head>
            <Background tag="tr">
              <Table.Header>{"Alt Header"}</Table.Header>
              <Table.Header>{"Alt Header"}</Table.Header>
              <Table.Header>{"Alt Header"}</Table.Header>
              <Table.Header>{"Alt Header"}</Table.Header>
            </Background>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{"Expanded"}</Table.Cell>
              <Table.Cell>{"Expanded"}</Table.Cell>
              <Table.Cell>{"Expanded"}</Table.Cell>
              <Table.Cell>
                  <Pill text="Pill" 
                      variant="primary"
                  />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Expanded"}</Table.Cell>
              <Table.Cell>{"Expanded"}</Table.Cell>
              <Table.Cell>{"Expanded"}</Table.Cell>
              <Table.Cell>
                  <Pill text="Pill" 
                      variant="primary"
                  />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{"Expanded"}</Table.Cell>
              <Table.Cell>{"Expanded"}</Table.Cell>
              <Table.Cell>{"Expanded"}</Table.Cell>
              <Table.Cell>
                  <Pill text="Pill" 
                      variant="primary"
                  />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card>
    );
  };

    return (
    <Table
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
          <Table.Header>{''}</Table.Header>
        </Table.Row>

      </Table.Head>
      <Table.Body>
        <Table.Row collapsible 
            collapsibleContent={<Content/>}
            collapsibleSideHighlight={false}
        >
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>{'Value 3'}</Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell>{'Value 5'}</Table.Cell>
          <Table.Cell>{ 
            <Icon
                color="primary"
                fixedWidth
                icon="chevron-down"
            />}
          </Table.Cell>

        </Table.Row>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>{'Value 3'}</Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell>{'Value 5'}</Table.Cell>
          <Table.Cell>{''}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>{'Value 3'}</Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell>{'Value 5'}</Table.Cell>
          <Table.Cell>{''}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default TableWithCollapsibleWithNestedTable