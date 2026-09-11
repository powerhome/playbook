import React from 'react'

import Table from '../_table'
import Title from '../../pb_title/_title'

const TableResponsiveTable = (props) => {
  return (
    <div>
      <Title
          size={4}
          text="Not Responsive"
          {...props}
      />
      <Table
          responsive="none"
          {...props}
      >
        <Table.Head>
          <Table.Row>
            <Table.Header>{'Column 1'}</Table.Header>
            <Table.Header>{'Column 2'}</Table.Header>
            <Table.Header>{'Column 3'}</Table.Header>
            <Table.Header>{'Column 4'}</Table.Header>
            <Table.Header>{'Column 5'}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{'Value 1'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <br />
      <br />
      <Title
          size={4}
          text="Collapse Mobile"
          {...props}
      />
      <Table
          collapse="sm"
          {...props}
      >
        <Table.Head>
          <Table.Row>
            <Table.Header>{'Column 1'}</Table.Header>
            <Table.Header>{'Column 2'}</Table.Header>
            <Table.Header>{'Column 3'}</Table.Header>
            <Table.Header>{'Column 4'}</Table.Header>
            <Table.Header>{'Column 5'}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{'Value 1'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <br />
      <br />
      <Title
          size={4}
          text="Collapse Tablet"
          {...props}
      />
      <Table
          collapse="md"
          {...props}
      >
        <Table.Head>
          <Table.Row>
            <Table.Header>{'Column 1'}</Table.Header>
            <Table.Header>{'Column 2'}</Table.Header>
            <Table.Header>{'Column 3'}</Table.Header>
            <Table.Header>{'Column 4'}</Table.Header>
            <Table.Header>{'Column 5'}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{'Value 1'}</Table.Cell>
            <Table.Cell>{'Value 2'}</Table.Cell>
            <Table.Cell>{'Value 3'}</Table.Cell>
            <Table.Cell>{'Value 4'}</Table.Cell>
            <Table.Cell>{'Value 5'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <br />
      <br />
      <Title
          size={4}
          text="Collapse Desktop"
          {...props}
      />
      <Table
          collapse="lg"
          {...props}
      >
        <Table.Head>
          <Table.Row>
            <Table.Header>{'Column 1'}</Table.Header>
            <Table.Header>{'Column 2'}</Table.Header>
            <Table.Header>{'Column 3'}</Table.Header>
            <Table.Header>{'Column 4'}</Table.Header>
            <Table.Header>{'Column 5'}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{'Value 1'}</Table.Cell>
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

export default TableResponsiveTable
