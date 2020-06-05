import React from 'react'
import { Table, TableRow } from '../../'

const TableSideHighlight = () => {
  return (
    <div>
      <Table size="sm">
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
          <TableRow sideHighlightColor="solar">
            <td>{'Solar'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="roofing">
            <td>{'Roofing'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="gutters">
            <td>{'Gutters'}</td>
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

      <Table size="sm">
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

      <br />

      <Table size="sm">
        <thead>
          <tr>
            <th>{'Category Colors'}</th>
            <th>{'Column 2'}</th>
            <th>{'Column 3'}</th>
            <th>{'Column 4'}</th>
            <th>{'Column 5'}</th>
          </tr>
        </thead>
        <tbody>
          <TableRow sideHighlightColor="category_1">
            <td>{'Category Color 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="category_2">
            <td>{'Category Color 2'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow sideHighlightColor="category_3">
            <td>{'Category Color 3'}</td>
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
