import React from 'react'
import Table from '../../pb_table/_table'
import Icon from '../../pb_icon/_icon'

const TableWithClickableRows = (props) => {


  return (
      <Table 
          size="sm" 
          {...props}
      >
          <Table.Head>
              <Table.Row>
                  <Table.Header>{"Column 1"}</Table.Header>
                  <Table.Header>{"Column 2"}</Table.Header>
                  <Table.Header>{"Column 3"}</Table.Header>
                  <Table.Header>{"Column 4"}</Table.Header>
                  <Table.Header>{"Column 5"}</Table.Header>
                  <Table.Header>{""}</Table.Header>
              </Table.Row>
          </Table.Head>
          <Table.Body>
              <Table.Row
                  cursor="pointer"
                  htmlOptions={{ onClick: () => alert("Row 1 clicked") }}
                  {...props}
              >
                <Table.Cell>{"Value 1"}</Table.Cell>
                <Table.Cell>{"Value 2"}</Table.Cell>
                <Table.Cell>{"Value 3"}</Table.Cell>
                <Table.Cell>{"Value 4"}</Table.Cell>
                <Table.Cell>{"Value 5"}</Table.Cell>
                <Table.Cell textAlign="right">
                    <Icon 
                        color="primary_action"
                        fixedWidth
                        icon="chevron-right" 
                        size="xs"
                        {...props}
                    />
                </Table.Cell>
              </Table.Row>
              <Table.Row
                  cursor="pointer"
                  htmlOptions={{ onClick: () => alert("Row 2 clicked") }}
                  {...props}
              >
                  <Table.Cell>{"Value 1"}</Table.Cell>
                  <Table.Cell>{"Value 2"}</Table.Cell>
                  <Table.Cell>{"Value 3"}</Table.Cell>
                  <Table.Cell>{"Value 4"}</Table.Cell>
                  <Table.Cell>{"Value 5"}</Table.Cell>
                  <Table.Cell textAlign="right">
                      <Icon 
                          color="primary_action"
                          fixedWidth
                          icon="chevron-right" 
                          size="xs"
                          {...props}
                      />                
                  </Table.Cell>
              </Table.Row>
              <Table.Row
                  cursor="pointer"
                  htmlOptions={{ onClick: () => alert("Row 3 clicked") }}
                  {...props}
              >
                  <Table.Cell>{"Value 1"}</Table.Cell>
                  <Table.Cell>{"Value 2"}</Table.Cell>
                  <Table.Cell>{"Value 3"}</Table.Cell>
                  <Table.Cell>{"Value 4"}</Table.Cell>
                  <Table.Cell>{"Value 5"}</Table.Cell>
                  <Table.Cell textAlign="right">
                      <Icon 
                          color="primary_action"
                          fixedWidth
                          icon="chevron-right" 
                          size="xs"
                          {...props}
                      />
                  </Table.Cell>
              </Table.Row>
          </Table.Body>
      </Table>
  )
}

export default TableWithClickableRows