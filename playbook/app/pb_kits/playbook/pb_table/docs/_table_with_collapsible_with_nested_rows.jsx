import React from 'react'

import Table from '../../pb_table/_table'
import Icon from '../../pb_icon/_icon'
import Background from '../../pb_background/_background'

const TableWithCollapsibleWithNestedRows = (props) => {

  const Content = () => {
    return (
      <Table 
          borderRadius="none"
          container={false}
          size="sm" 
          {...props}
      >
      <Background tag="tr" 
          {...props}
      >
        <Table.Cell>Expanded</Table.Cell>
        <Table.Cell>Expanded</Table.Cell>
        <Table.Cell>Expanded</Table.Cell>
        <Table.Cell>Expanded</Table.Cell>
        <Table.Cell>Expanded</Table.Cell>
      </Background>
      </Table>
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
          <Table.Cell textAlign="right">{ 
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

export default TableWithCollapsibleWithNestedRows