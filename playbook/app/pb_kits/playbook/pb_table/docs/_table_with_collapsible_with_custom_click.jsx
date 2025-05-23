import React from 'react'
import Table from '../../pb_table/_table'
import Icon from '../../pb_icon/_icon'
import Card from '../../pb_card/_card'
import Body from '../../pb_body/_body'

const TableWithCollapsibleWithCustomClick = (props) => {

  const Content = () => {
    return (
      <Card
          borderNone
          borderRadius="none"
          padding="md"
          {...props}
      >
        <Body {...props}>Nested content inside a Table Row</Body>
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
              toggleCellId="cell-1"
              {...props}
          >
            <Table.Cell>{'Value 1'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
            <Table.Cell cursor="pointer"
                id="cell-1"
                textAlign="right"
            >
              <Icon
                  color="primary"
                  fixedWidth
                  icon="chevron-down"
              />
            </Table.Cell>

          </Table.Row>
          <Table.Row collapsible
              collapsibleContent={<Content/>}
              toggleCellId="cell-2"
              {...props}
          >
            <Table.Cell>{'Value 1'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
            <Table.Cell cursor="pointer"
                id="cell-2"
                textAlign="right"
            >
              <Icon
                  color="primary"
                  fixedWidth
                  icon="chevron-down"
              />
            </Table.Cell>

          </Table.Row>
          <Table.Row collapsible
              collapsibleContent={<Content/>}
              toggleCellId="cell-3"
              {...props}
          >
            <Table.Cell>{'Value 1'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
            <Table.Cell cursor="pointer"
                id="cell-3"
                textAlign="right"
            >
              <Icon
                  color="primary"
                  fixedWidth
                  icon="chevron-down"
              />
            </Table.Cell>

          </Table.Row>
        </Table.Body>
      </Table>
  )
}

export default TableWithCollapsibleWithCustomClick