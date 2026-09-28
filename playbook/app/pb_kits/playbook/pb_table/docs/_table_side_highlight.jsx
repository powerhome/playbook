import React from 'react'

import Table from '../_table'

const TableSideHighlight = (props) => {
  return (
    <div>
      <Table
          size="sm"
          {...props}
      >
        <Table.Head>
          <Table.Row>
            <Table.Header>{'Product colors'}</Table.Header>
            <Table.Header>{'Column 2'}</Table.Header>
            <Table.Header>{'Column 3'}</Table.Header>
            <Table.Header>{'Column 4'}</Table.Header>
            <Table.Header>{'Column 5'}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row
              sideHighlightColor="product_1_highlight"
              {...props}
          >
            <Table.Cell>{'Product 1'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
          <Table.Row
              sideHighlightColor="product_2_highlight"
              {...props}
          >
            <Table.Cell>{'Product 2'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
          <Table.Row
              sideHighlightColor="product_3_highlight"
              {...props}
          >
            <Table.Cell>{'Product 3'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
          <Table.Row
              sideHighlightColor="none"
              {...props}
          >
            <Table.Cell>{'None'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <br />

      <Table
          size="sm"
          {...props}
      >
        <Table.Head>
          <Table.Row>
            <Table.Header>{'Status colors'}</Table.Header>
            <Table.Header>{'Column 2'}</Table.Header>
            <Table.Header>{'Column 3'}</Table.Header>
            <Table.Header>{'Column 4'}</Table.Header>
            <Table.Header>{'Column 5'}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row
              sideHighlightColor="success"
              {...props}
          >
            <Table.Cell>{'Success'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
          <Table.Row
              sideHighlightColor="warning"
              {...props}
          >
            <Table.Cell>{'Warning'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
          <Table.Row
              sideHighlightColor="error"
              {...props}
          >
            <Table.Cell>{'Error'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
          <Table.Row
              sideHighlightColor="none"
              {...props}
          >
            <Table.Cell>{'None'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <br />

      <Table
          size="sm"
          {...props}
      >
        <Table.Head>
          <Table.Row>
            <Table.Header>{'Category Colors'}</Table.Header>
            <Table.Header>{'Column 2'}</Table.Header>
            <Table.Header>{'Column 3'}</Table.Header>
            <Table.Header>{'Column 4'}</Table.Header>
            <Table.Header>{'Column 5'}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row
              sideHighlightColor="category_1"
              {...props}
          >
            <Table.Cell>{'Category Color 1'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
          <Table.Row
              sideHighlightColor="category_2"
              {...props}
          >
            <Table.Cell>{'Category Color 2'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
          <Table.Row
              sideHighlightColor="category_3"
              {...props}
          >
            <Table.Cell>{'Category Color 3'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
          <Table.Row
              sideHighlightColor="none"
              {...props}
          >
            <Table.Cell>{'None'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default TableSideHighlight
