import React, { useState } from 'react'
import { Card, Nav, SectionSeparator, NavItem } from 'playbook-ui'
import GlobalProps from './globalProps'
import KitProps from './kitProps'

const reactDocgen = require('react-docgen')

const AvailableProps = ({ source, darkMode }) => {
  const globalProps = ['aria', 'className', 'data', 'dark', 'id']
  let showKitPropsTable = true, filteredProps = []

  try {
    const documentation = reactDocgen.parse(source)[0]
    filteredProps = Object.entries(documentation.props).filter(([key, value]) => !globalProps.includes(key))
  } catch (e) {
    showKitPropsTable = false
  }

  const [showKitTab, setShowKitTab] = useState(showKitPropsTable)

  return (
    <>
      <Card padding="none" dark={darkMode}>
        <Card.Body padding="sm">
          <Nav orientation="horizontal" variant="subtle" dark={darkMode}>
            {showKitPropsTable && <NavItem text="Kit Props" active={showKitTab} onClick={() => setShowKitTab(true)} cursor="pointer" dark={darkMode}/>}
            <NavItem text="Global Props" active={!showKitTab || !showKitPropsTable} onClick={() => setShowKitTab(false)} cursor="pointer" dark={darkMode} />
          </Nav>
        </Card.Body>
        <SectionSeparator  dark={darkMode} />
        {showKitTab && <KitProps kitPropsValues={filteredProps} darkMode={darkMode} />}
        {!showKitTab && <GlobalProps darkMode={darkMode}/>}
      </Card>
    </>
  )
}

export default AvailableProps
