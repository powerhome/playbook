import React from 'react'
import { Card, Title, Body, Table } from 'playbook-ui'
import globalPropsValues from './globalPropsValues'

const GlobalProps = () => {
  return (
    <>
      <Card.Body padding="none">
        <Table container={false} disableHover size="md" >
          <thead>
            <tr>
              <th>Props</th>
              <th>Type</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            {globalPropsValues.map(prop => (
              <>
                <tr>
                  <td>
                    <Title text={prop.prop} tag="h4" size={4} />
                  </td>
                  <td>
                    <Card
                      padding="xxs"
                      background="light"
                      borderNone
                      borderRadius="sm"
                      display="inline_block"
                    >
                      <Body className="kearning">
                        {prop.type}
                      </Body>
                    </Card>
                  </td>
                  <td>
                    <Card
                      flexDirection="row"
                      padding="xxs"
                      background="light"
                      borderNone
                      borderRadius="sm"
                      margin="xxs"
                      display="inline_block"
                    >
                      <Body className="kearning">
                        {prop.values}
                      </Body>
                    </Card>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </>
  )
}

export default GlobalProps
