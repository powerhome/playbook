import React, { useState } from 'react'
import { Card, Nav, SectionSeparator, NavItem } from 'playbook-ui'
import GlobalProps from './globalProps'
import GlobalPropsValues from './globalPropsValues'
import KitProps from './kitProps'

type AvailablePropsType = {
  availableProps: any,
  darkMode: boolean
}

const AvailableProps = ({ availableProps, darkMode }: AvailablePropsType) => {
  const props = JSON.parse(availableProps)
  const globalPropsNames = GlobalPropsValues.map(prop => prop.prop)
  const [showKitTab, setShowKitTab] = useState(true)

  for(var propName in props) {
    if(globalPropsNames.includes(propName)) {
      delete props[propName]
    }
  }

  return (
    <>
      <Card padding="none" dark={darkMode}>
        <Card.Body padding="sm">
          <Nav orientation="horizontal" variant="subtle" dark={darkMode}>
            <NavItem text="Kit Props" active={showKitTab} onClick={() => setShowKitTab(true)} cursor="pointer" dark={darkMode}/>
            <NavItem text="Global Props" active={!showKitTab} onClick={() => setShowKitTab(false)} cursor="pointer" dark={darkMode} />
          </Nav>
        </Card.Body>
        <SectionSeparator  dark={darkMode} />
        {showKitTab && <KitProps kitPropsValues={props} darkMode={darkMode} />}
        {!showKitTab && <GlobalProps darkMode={darkMode}/>}
      </Card>
    </>
  )
}

export default AvailableProps
