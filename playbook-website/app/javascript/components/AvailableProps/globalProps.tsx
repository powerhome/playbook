import React from 'react'
import { Body, Card, Table, Title } from 'playbook-ui'
import globalPropsValues from './globalPropsValues'

const GlobalProps = ({ darkMode }) => {
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
            {globalPropsValues.map((prop) => (
              <>
                <tr>
                  <td>
                    <Title
                        dark={darkMode}
                        size={4}
                        tag="h4"
                        text={prop.prop}
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
                        {prop.type}
                      </Body>
                    </Card>
                  </td>
                  <td>
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
