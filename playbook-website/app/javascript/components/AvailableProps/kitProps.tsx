import React from 'react'
import { Card, Title, Body, Table } from 'playbook-ui'

const KitProps = ({ kitPropsValues }) => {
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
            {kitPropsValues.map(([propName, propsValue]) => (
              <>
                <tr>
                  <td>
                    <Title text={propName} tag="h4" size={4} />
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
                        {
                          propsValue.flowType.name === 'signature' ? propsValue.flowType.type : propsValue.flowType.name
                        }
                      </Body>
                    </Card>
                  </td>
                  <td>
                    {
                      propsValue.flowType.raw ? (
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
                            {propsValue.flowType.name === 'union' && propsValue.flowType.raw}
                          </Body>
                        </Card>
                        ) : null
                    }

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

export default KitProps
