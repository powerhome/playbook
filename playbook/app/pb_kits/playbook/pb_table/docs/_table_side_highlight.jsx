import React from 'react'
import { Table, TableRow } from '../../'

const TableSideHighlight = (props) => {
  return (
    <div>
      <Table
          size="sm"
          {...props}
      >
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
              sideHighlightColor="solar"
              {...props}
          >
            <td>{'Solar'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow
              sideHighlightColor="roofing"
              {...props}
          >
            <td>{'Roofing'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow
              sideHighlightColor="gutters"
              {...props}
          >
            <td>{'Gutters'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow
              sideHighlightColor="none"
              {...props}
          >
            <td>{'None'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
        </tbody>
      </Table>

      <br />

      <Table
          size="sm"
          {...props}
      >
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
          <TableRow
              sideHighlightColor="success"
              {...props}
          >
            <td>{'Success'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow
              sideHighlightColor="warning"
              {...props}
          >
            <td>{'Warning'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow
              sideHighlightColor="error"
              {...props}
          >
            <td>{'Error'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow
              sideHighlightColor="none"
              {...props}
          >
            <td>{'None'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
        </tbody>
      </Table>

      <br />

      <Table
          size="sm"
          {...props}
      >
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
          <TableRow
              sideHighlightColor="category_1"
              {...props}
          >
            <td>{'Category Color 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow
              sideHighlightColor="category_2"
              {...props}
          >
            <td>{'Category Color 2'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow
              sideHighlightColor="category_3"
              {...props}
          >
            <td>{'Category Color 3'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </TableRow>
          <TableRow
              sideHighlightColor="none"
              {...props}
          >
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
