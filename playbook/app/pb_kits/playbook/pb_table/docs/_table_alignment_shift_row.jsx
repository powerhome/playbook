import React from 'react'
import { Table } from '../../'

const TableAlignmentShiftRow = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th>{'Column 4'}</th>
          <th>{'Column 5'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {'Value 1a'}
            <br />
            {'Value 1a'}
            <br />
            {'Value 1a'}
          </td>
          <td>{'Value 2a'}</td>
          <td>{'Value 3a'}</td>
          <td>{'Value 4a'}</td>
          <td>{'Value 5a'}</td>
        </tr>
        <tr shift="middle">
          <td>
            {'Value 1b'}
            <br />
            {'Value 1b'}
            <br />
            {'Value 1b'}
          </td>
          <td>{'Value 2b'}</td>
          <td>{'Value 3b'}</td>
          <td>{'Value 4b'}</td>
          <td>{'Value 5b'}</td>
        </tr>
        <tr shift="down">
          <td>
            {'Value 1c'}
            <br />
            {'Value 1c'}
            <br />
            {'Value 1c'}
          </td>
          <td>{'Value 2c'}</td>
          <td>{'Value 3c'}</td>
          <td>{'Value 4c'}</td>
          <td>{'Value 5c'}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableAlignmentShiftRow
