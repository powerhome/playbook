import React from "react"
import Example from "../Templates/Example"
import { Table } from "playbook-ui"

const VALUES = ["baseline", "super", "top", "middle", "bottom", "sub", "text-top", "text-bottom"]

const VerticalAlign = ({
  example,
}: {
  example: string,
}) => (
  <>
    <Example
      description='Vertical alignment is an important aspect of layout, particularly for inline text and table cells, where Flex Box support can be limited. Our global prop allows you to quickly apply vertical alignment when and where you need it.'
      example={example}
      globalProps={{
        verticalAlign: VALUES,
      }}
      title='Vertical Align'
    >
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>{'Column 1'}</Table.Header>
            <Table.Header>{'Column 2'}</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row verticalAlign="middle">
            <Table.Cell>
              {'Value 1a'}
              <br />
              {'Value 1a'}
              <br />
              {'Value 1a'}
            </Table.Cell>
            <Table.Cell>{'Value 2a'}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {'Value 1b'}
              <br />
              {'Value 1b'}
              <br />
              {'Value 1b'}
            </Table.Cell>
            <Table.Cell verticalAlign="bottom">{'Value 2b'}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Example>
  </>
)

export default VerticalAlign
