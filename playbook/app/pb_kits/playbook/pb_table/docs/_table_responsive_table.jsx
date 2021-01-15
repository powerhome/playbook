import React from 'react'
import { Table, Title } from '../../'

const TableResponsiveTable = (props) => {
  return (
    <div>
      <Title
          size={4}
          text="Default"
          {...props}
      />
      <Table
          {...props}
      >
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
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </tr>
        </tbody>
      </Table>
      <br />
      <br />
      <Title
          size={4}
          text="Default"
          {...props}
      />
      <Table
          responsive="none"
          {...props}
      >
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
            <td>{'Value 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default TableResponsiveTable
