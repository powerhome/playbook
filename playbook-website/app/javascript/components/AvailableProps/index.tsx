import React, { useState } from 'react'
import { Card, Nav, SectionSeparator, NavItem } from 'playbook-ui'
import GlobalProps from './globalProps'
import KitProps from './kitProps'

const reactDocgen = require('react-docgen')

const AvailableProps = ({ source }) => {
  const globalProps = ['aria', 'className', 'data', 'dark', 'id']
  let showKitPropsTable = true, filteredProps = []

  try {
    const documentation = reactDocgen.parse(source)
    filteredProps = Object.entries(documentation.props).filter(([key, value]) => !globalProps.includes(key))
  } catch (e) {
    showKitPropsTable = false
  }

  const [showKitTab, setShowKitTab] = useState(showKitPropsTable)

  return (
    <>
      <Card padding="none">
        <Card.Body padding="sm">
          <Nav orientation="horizontal" variant="subtle">
            {showKitPropsTable && <NavItem text="Kit Props" active={showKitTab} onClick={() => setShowKitTab(true)} cursor="pointer" />}
            <NavItem text="Global Props" active={!showKitTab || !showKitPropsTable} onClick={() => setShowKitTab(false)} cursor="pointer" />
          </Nav>
        </Card.Body>
        <SectionSeparator />
        {showKitTab && <KitProps kitPropsValues={filteredProps} />}
        {!showKitTab && <GlobalProps />}
      </Card>
    </>
  )
}

export default AvailableProps
