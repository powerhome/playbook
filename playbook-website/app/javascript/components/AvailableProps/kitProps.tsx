import React from 'react'
import { Body, Card, Table, Title } from 'playbook-ui'

const KitProps = ({ kitPropsValues, darkMode }) => {
  return (
    <>
      <Card.Body
          dark={darkMode}
          padding="none"
      >
        <Table
            container={false}
            dark={darkMode}
            disableHover
            size="md"
        >
          <thead>
            <tr>
              <th>{'Props'}</th>
              <th>{'Type'}</th>
              <th>{'Values'}</th>
            </tr>
          </thead>
          <tbody>
            {kitPropsValues.map(([propName, propsValue]) => (
              <>
                <tr>
                  <td>
                    <Title
                        dark={darkMode}
                        size={4}
                        tag="h4"
                        text={propName}
                    />
                  </td>
                  <td>
                    <Card
                        background={darkMode ? 'dark' : 'light'}
                        borderNone
                        borderRadius="sm"
                        display="inline_block"
                        padding="xxs"
                    >
                      <Body
                          className="kearning"
                          dark={darkMode}
                      >
                        {
                          propsValue.flowType.name === 'signature' ? propsValue.flowType.type : propsValue.flowType.name
                        }
                      </Body>
                    </Card>
                  </td>
                  <td>
                    {
                      // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
                      propsValue.flowType.raw ? (
                        <Card
                            background={darkMode ? 'dark' : 'light'}
                            borderNone
                            borderRadius="sm"
                            display="inline_block"
                            flexDirection="row"
                            margin="xxs"
                            padding="xxs"
                        >
                          <Body
                              className="kearning"
                              dark={darkMode}
                          >
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
