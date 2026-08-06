import React from 'react'
import { Body, Card, Table, Title } from 'playbook-ui'
import globalPropsValues from './globalPropsValues'
import { formatPropNameForPlatform } from '../../helpers/platform'

type GlobalPropsType = {
  darkMode: boolean,
  platform?: string
}

const GlobalProps = ({ darkMode, platform = 'react' }: GlobalPropsType) => {
  const platformProps = globalPropsValues.filter(
    (prop) => !prop.platforms || prop.platforms.includes(platform)
  )

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
            {platformProps.map((prop) => (
              <>
                <tr>
                  <td>
                    <Title
                        dark={darkMode}
                        size={4}
                        tag="h4"
                        text={formatPropNameForPlatform(prop.prop, platform)}
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
