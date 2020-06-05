import React from 'react'
import { Table, TableRow } from '../../'

const TableSideHighlight = () => {
  return (
    <div>
      <Table size="md">
        <thead>
          <tr>
            <th>{'Product colors'}</th>
            <th>{'Column 2'}</th>
            <th>{'Column 3'}</th>
            <th>{'Column 4'}</th>
            <th>{'Column 5'}</th>
          </tr>
        </thead>
        <tbody>
          <TableRow
              sideHighlightColor="windows"
          >
            <td>{'Windows'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="siding">
            <td>{'Siding'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="doors">
            <td>{'Doors'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="none">
            <td>{'None'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
        </tbody>
      </Table>

      <br />

      <Table size="md">
        <thead>
          <tr>
            <th>{'Status colors'}</th>
            <th>{'Column 2'}</th>
            <th>{'Column 3'}</th>
            <th>{'Column 4'}</th>
            <th>{'Column 5'}</th>
          </tr>
        </thead>
        <tbody>
          <TableRow sideHighlightColor="success">
            <td>{'Success'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="warning">
            <td>{'Warning'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="error">
            <td>{'Error'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="none">
            <td>{'None'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
        </tbody>
      </Table>
    </div>
  )
}

export default TableSideHighlight
