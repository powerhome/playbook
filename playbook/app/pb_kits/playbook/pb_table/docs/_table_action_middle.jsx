import React from 'react'

import Table from '../_table'
import Button from '../../pb_button/_button'

const TableActionMiddle = (props) => {
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
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>
            {' '}
            <Button
                onClick={() => alert('button clicked!')}
                paddingLeft="none"
                text="Action"
                variant="link"
                {...props}
            />
          </Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell>{'Value 5'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>
            {' '}
            <Button
                onClick={() => alert('button clicked!')}
                paddingLeft="none"
                text="Action"
                variant="link"
                {...props}
            />
          </Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell>{'Value 5'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>
            {' '}
            <Button
                onClick={() => alert('button clicked!')}
                paddingLeft="none"
                text="Action"
                variant="link"
                {...props}
            />
          </Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell>{'Value 5'}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default TableActionMiddle
