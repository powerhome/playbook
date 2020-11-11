import React from 'react'
import { Table } from '../../'

const TableAlignmentShiftData = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>
            {'Column 2'}
            <br />
            {'with a very long name'}
            <br />
            {'that just keeps going and going'}
          </th>
          <th shift="up">{'Column 3'}</th>
          <th shift="down">{'Column 4'}</th>
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
          <td shift="up">{'Value 3a'}</td>
          <td shift="down">{'Value 4a'}</td>
        </tr>
        <tr>
          <td>
            {'Value 1b'}
            <br />
            {'Value 1b'}
            <br />
            {'Value 1b'}
          </td>
          <td>{'Value 2b'}</td>
          <td shift="up">{'Value 3b'}</td>
          <td shift="down">{'Value 4b'}</td>
        </tr>
        <tr>
          <td>
            {'Value 1c'}
            <br />
            {'Value 1c'}
            <br />
            {'Value 1c'}
          </td>
          <td>{'Value 2c'}</td>
          <td shift="up">{'Value 3c'}</td>
          <td shift="down">{'Value 4c'}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableAlignmentShiftData
