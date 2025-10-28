import React, { useState } from 'react'
import Table from '../../pb_table/_table'
import Icon from '../../pb_icon/_icon'
import Card from '../../pb_card/_card'
import Body from '../../pb_body/_body'

const TableWithCollapsible = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleArrows = () => {
    setIsOpen(!isOpen)
  }

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
            collapsibleContent={<Content />}
            {...props}
        >
          <Table.Cell htmlOptions={{ onClick: handleToggleArrows }}>{'Value 1'}</Table.Cell>
          <Table.Cell htmlOptions={{ onClick: handleToggleArrows }}>{'Value 2'}</Table.Cell>
          <Table.Cell htmlOptions={{ onClick: handleToggleArrows }}>{'Value 3'}</Table.Cell>
          <Table.Cell htmlOptions={{ onClick: handleToggleArrows }}>{'Value 4'}</Table.Cell>
          <Table.Cell htmlOptions={{ onClick: handleToggleArrows }}>{'Value 5'}</Table.Cell>
          <Table.Cell
              htmlOptions={{ onClick: handleToggleArrows }}
              textAlign="right"
          >
            {
              <Icon
                  color="primary"
                  fixedWidth
                  icon={isOpen ? 'chevron-up' : 'chevron-down'}
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

export default TableWithCollapsible