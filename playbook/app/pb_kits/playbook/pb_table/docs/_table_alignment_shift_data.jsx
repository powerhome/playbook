import React from 'react'

import Table from '../_table'

const TableAlignmentShiftData = (props) => {
  return (
    <div>
      <Table
          marginBottom="md"
          {...props}
      >
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>{'Price'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td shift="down">{'Total'}</td>
            <td>
              {'$12'}
              <br />
              {'$46'}
              <br />
              {'$25'}
              <br />
              {'-------'}
              <br />
              {'$83'}
            </td>
          </tr>
        </tbody>
      </Table>
      <Table
          {...props}
      >
        <thead>
          <tr>
            <th>{'Espresso Drinks'}</th>
            <th>{'Ingredients'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td shift="up">{'Cappuccino'}</td>
            <td>
              {'Espresso'}
              <br />
              {'Steamed Milk'}
              <br />
              {'Milk Foam'}
            </td>
          </tr>
          <tr>
            <td shift="up">{'Macchiato'}</td>
            <td>
              {'Espresso'}
              <br />
              {'Steamed Milk'}
            </td>
          </tr>
          <tr>
            <td shift="up">{'Mocha'}</td>
            <td>
              {'Espresso'}
              <br />
              {'Hot Chocolate'}
              <br />
              {'Steamed Milk'}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default TableAlignmentShiftData
