import React from 'react'

import Table from '../../pb_table/_table'
import Icon from '../../pb_icon/_icon'
import Card from '../../pb_card/_card'
import Body from '../../pb_body/_body'
import Image from '../../pb_image/_image'
import Flex from '../../pb_flex/_flex'

const TableWithCollapsibleWithCustomContent = (props) => {

  const Content = () => {
    return (
      <Card 
          borderNone
          borderRadius="none"
          color="light"
          paddingX="xl"
          paddingY="md"
          {...props}
      >
         <Body paddingBottom="sm"
             text="Expanded Custom Layout"
             {...props}
         />
         <Flex justify="between">
           <Image
               size="sm"
               url="https://unsplash.it/500/400/?image=634"
           />
           <Image
               size="sm"
               url="https://unsplash.it/500/400/?image=634"
           />
           <Image
               size="sm"
               url="https://unsplash.it/500/400/?image=634"
           />
           <Image
               size="sm"
               url="https://unsplash.it/500/400/?image=634"
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
            {...props}
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

export default TableWithCollapsibleWithCustomContent