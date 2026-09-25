import React from 'react'

import Table from '../_table'
import Button from '../../pb_button/_button'

const TableTwoActions = (props) => {
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
          <Table.Cell textAlign="right">
            <Button
                onClick={() => alert('button clicked!')}
                paddingLeft="none"
                text="Tertiary Action"
                variant="link"
                {...props}
            />
            <Button
                onClick={() => alert('button clicked!')}
                text="Secondary Action"
                variant="secondary"
                {...props}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>{'Value 3'}</Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell textAlign="right">
            <Button
                onClick={() => alert('button clicked!')}
                paddingLeft="none"
                text="Tertiary Action"
                variant="link"
                {...props}
            />
            <Button
                onClick={() => alert('button clicked!')}
                text="Secondary Action"
                variant="secondary"
                {...props}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>{'Value 1'}</Table.Cell>
          <Table.Cell>{'Value 2'}</Table.Cell>
          <Table.Cell>{'Value 3'}</Table.Cell>
          <Table.Cell>{'Value 4'}</Table.Cell>
          <Table.Cell textAlign="right">
            <Button
                onClick={() => alert('button clicked!')}
                paddingLeft="none"
                text="Tertiary Action"
                variant="link"
                {...props}
            />
            <Button
                onClick={() => alert('button clicked!')}
                text="Secondary Action"
                variant="secondary"
                {...props}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default TableTwoActions
