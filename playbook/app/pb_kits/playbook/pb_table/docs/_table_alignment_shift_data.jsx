import React from 'react'

import Table from '../_table'

const TableAlignmentShiftData = (props) => {
  return (
    <div>
      <Table
          marginBottom="md"
          {...props}
      >
        <Table.Head>
          <Table.Row>
            <Table.Header>&nbsp;</Table.Header>
            <Table.Header>{'Price'}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell shift="down">{'Total'}</Table.Cell>
            <Table.Cell>
              {'$12'}
              <br />
              {'$46'}
              <br />
              {'$25'}
              <br />
              {'-------'}
              <br />
              {'$83'}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Table
          {...props}
      >
      <Table.Head>
        <Table.Row>
          <Table.Header>{'Espresso Drinks'}</Table.Header>
          <Table.Header>{'Ingredients'}</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell shift="up">{'Cappuccino'} </Table.Cell>
          
          <Table.Cell>
          {'Steamed Milk'}
          <br />
          {'Milk Foam'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell shift="up">
            {'Macchiato'}
            </Table.Cell>
            <Table.Cell shift="up">
            {'Espresso'}
            <br />
            {'Steamed Milk'}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>
            {'Mocha'}
            </Table.Cell>
          <Table.Cell>
            {'Hot Chocolate'}
            <br />
            {'Steamed Milk'}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </div>
  )
}

export default TableAlignmentShiftData
