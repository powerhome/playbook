import React from 'react'

import Table from '../_table'
import Icon from '../../pb_icon/_icon'
import Body from '../../pb_body/_body'
import Image from '../../pb_image/_image'
import Flex from '../../pb_flex/_flex'
import Card from '../../pb_card/_card'

const TableWithCollapsibleWithIcon = (props) => {

  const Content = () => {
    return (
      <Card color="light" 
          padding="sm"
      >
         <Body paddingBottom="sm" 
             text="Expanded Custom Layout"
         />
         <Flex justify="between">
           <Image
               url="https://via.placeholder.com/150"
           />
           <Image
               url="https://via.placeholder.com/150"
           />
           <Image
               url="https://via.placeholder.com/150"
           />
           <Image
               url="https://via.placeholder.com/150"
           />
          </Flex>
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

export default TableWithCollapsibleWithIcon
