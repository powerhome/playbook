import React from 'react'

import Table from '../_table'

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
          <Table.Row
              sideHighlightColor="product_1_highlight"
              {...props}
          >
            <td>{'Product 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
          <Table.Row
              sideHighlightColor="product_2_highlight"
              {...props}
          >
            <td>{'Product 2'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
          <Table.Row
              sideHighlightColor="product_3_highlight"
              {...props}
          >
            <td>{'Product 3'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
          <Table.Row
              sideHighlightColor="none"
              {...props}
          >
            <td>{'None'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
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
          <Table.Row
              sideHighlightColor="success"
              {...props}
          >
            <td>{'Success'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
          <Table.Row
              sideHighlightColor="warning"
              {...props}
          >
            <td>{'Warning'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
          <Table.Row
              sideHighlightColor="error"
              {...props}
          >
            <td>{'Error'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
          <Table.Row
              sideHighlightColor="none"
              {...props}
          >
            <td>{'None'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
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
          <Table.Row
              sideHighlightColor="category_1"
              {...props}
          >
            <td>{'Category Color 1'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
          <Table.Row
              sideHighlightColor="category_2"
              {...props}
          >
            <td>{'Category Color 2'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
          <Table.Row
              sideHighlightColor="category_3"
              {...props}
          >
            <td>{'Category Color 3'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
          <Table.Row
              sideHighlightColor="none"
              {...props}
          >
            <td>{'None'}</td>
            <td>{'Value 2'}</td>
            <td>{'Value 3'}</td>
            <td>{'Value 4'}</td>
            <td>{'Value 5'}</td>
          </Table.Row>
        </tbody>
      </Table>
    </div>
  )
}

export default TableSideHighlight
