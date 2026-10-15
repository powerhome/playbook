import React from 'react'
import { Body, Card, Table, Title } from 'playbook-ui'

type SchemaPlatform = 'react' | 'rails'
type SplitType = { react?: string, rails?: string }
type SchemaType = string | SplitType

type PropValue = {
  type: SchemaType
  values?: string[]
  default?: any
  platforms?: string[]
}

type KitPropsType = {
  kitPropsValues: {[key: string]: PropValue},
  darkMode: boolean,
  platform?: SchemaPlatform,
}

const isSplitType = (type: SchemaType): type is SplitType =>
  typeof type === 'object' && type !== null

const KitProps = ({ kitPropsValues, darkMode, platform }: KitPropsType) => {
  // Clean up type string (remove trailing semicolons from schema)
  const cleanType = (type?: string) => type?.replace(/;$/, '') || 'string'

  const typeForDisplay = (prop: PropValue) => {
    const type = prop.type
    if (isSplitType(type)) {
      if (platform && type[platform]) return cleanType(type[platform])
      const parts: string[] = []
      if (type.react) parts.push(`react: ${cleanType(type.react)}`)
      if (type.rails) parts.push(`rails: ${cleanType(type.rails)}`)
      return parts.join(' · ') || 'string'
    }
    return cleanType(type)
  }

  const getTypeName = (prop: PropValue) => {
    const type = typeForDisplay(prop)
    if (type.includes('|')) return 'union'
    if (type === 'enum') return 'union'
    if (type === 'function') return 'function'
    return type
  }

  const getTypeValues = (prop: PropValue) => {
    if (prop.values && prop.values.length > 0) {
      return prop.values.join(' | ')
    }
    const type = typeForDisplay(prop)
    if (type === 'boolean') {
      return 'true | false'
    }
    return ''
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
            {Object.entries(kitPropsValues).sort(([a], [b]) => a.localeCompare(b)).map(([propName, propValue]) => (
              <tr key={propName}>
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
                      {getTypeName(propValue)}
                    </Body>
                  </Card>
                </td>
                <td>
                  {getTypeValues(propValue) && (
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
                        {getTypeValues(propValue)}
                      </Body>
                    </Card>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </>
  )
}

export default KitProps
