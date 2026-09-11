import React from 'react'

import Table from '../_table'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import Flex from '../../pb_flex/_flex'

const TableTwoPlusActions = (props) => {
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
          <Table.Header>{''}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>{'Value 3'}</Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell>
            <Flex justify="end">
              <CircleIconButton
                  icon="ellipsis-h"
                  variant="secondary"
                  {...props}
              />
            </Flex>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>{'Value 3'}</Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell>
            <Flex justify="end">
              <CircleIconButton
                  icon="ellipsis-h"
                  variant="secondary"
                  {...props}
              />
            </Flex>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>{'Value 3'}</Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell>
            <Flex justify="end">
              <CircleIconButton
                  icon="ellipsis-h"
                  variant="secondary"
                  {...props}
              />
            </Flex>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default TableTwoPlusActions
