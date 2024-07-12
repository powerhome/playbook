import React from 'react'
import { Body, Card, Table, Title } from 'playbook-ui'

type KitPropsType = {
  kitPropsValues: {[key: string]: any},
  darkMode: boolean
}

const KitProps = ({ kitPropsValues, darkMode }: KitPropsType) => {
  const getTypeName = (typeName: string) => {
    if (typeName.indexOf('{') !== -1) {
      return 'object'
    }
    if (typeName.indexOf('|') !== -1) {
      return 'union'
    }
    if (typeName.indexOf('=>') !== -1) {
      return 'function'
    }
    return typeName
  }
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
            {Object.entries(kitPropsValues).map(([propName, propsValue]) => (
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
                        {getTypeName(propsValue.type.name)}
                      </Body>
                    </Card>
                  </td>
                  <td>
                    {
                      // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
                      propsValue.type.name ? (
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
                           {propsValue.type.name}
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
