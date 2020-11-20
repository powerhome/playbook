import React from 'react'
import { Table } from '../../'

const TableAlignmentColumn = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th align="center">{'Rating'}</th>
          <th align="right">{'Money'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td align="center">{'3'}</td>
          <td align="right">{'$57.32'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td align="center">{'2'}</td>
          <td align="right">{'$5,657.08'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td align="center">{'4'}</td>
          <td align="right">{'$358.77'}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableAlignmentColumn
