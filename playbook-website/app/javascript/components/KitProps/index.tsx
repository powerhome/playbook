import React from 'react'
import { Card, Nav, SectionSeparator, Table, Title, Body, NavItem } from 'playbook-ui'

const reactDocgen = require('react-docgen')

const KitProps = ({ source }) => {
  let showKitProps = true, filteredProps = []
  const globalProps = ['aria', 'className', 'data', 'dark', 'id']

  try {
    const documentation = reactDocgen.parse(source)
    filteredProps = Object.entries(documentation.props).filter(([key, value]) => !globalProps.includes(key))

    console.log('documentation: ', documentation)
    console.log('filtered: ', filteredProps)
  } catch (e) {
    showKitProps = false
  }

  return (
    <div>
      <Card padding="none">
        <Card.Body padding="sm">
          <Nav orientation="horizontal" variant="subtle">
            {showKitProps && <NavItem text="Kit Props" link="#" active />}
            <NavItem text="Global Props" link="#" active={!showKitProps} />
          </Nav>
        </Card.Body>
        <SectionSeparator />
        {showKitProps && (
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
                {filteredProps.map(([propName, propsValue]) => (
                  <>
                    <tr>
                      <td>
                        <Title text={propName} tag="h4" size={4} />
                      </td>
                      <td>
                        <Card
                          className="card"
                          padding="xxs"
                          background="light"
                          borderNone
                          borderRadius="sm"
                        >
                          <Body className="kearning">
                            {
                              propsValue.flowType.name === 'signature' ? propsValue.flowType.type : propsValue.flowType.name
                            }
                          </Body>
                        </Card>
                      </td>
                      <td>
                        <Card
                          flexDirection="row"
                          className="card"
                          padding="xxs"
                          background="light"
                          borderNone
                          borderRadius="sm"
                          margin="xxs"
                        >
                          <Body className="kearning">
                            {propsValue.flowType.name === 'union' && propsValue.flowType.raw}
                          </Body>
                        </Card>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        )}
      </Card>
    </div>
  )
}

export default KitProps
