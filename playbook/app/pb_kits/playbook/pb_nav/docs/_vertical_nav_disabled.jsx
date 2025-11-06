import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'
import Caption from '../../pb_caption/_caption'
import Flex from '../../pb_flex/_flex'

const VerticalNavDisabled = (props) => {
  return (
    <Flex justify="between" 
        wrap
    >
        <Flex orientation="column">
            <Caption marginBottom="sm">Default Variant</Caption>
            <Nav
                link="#"
                {...props}
            >
            <NavItem
                link="#"
                text="About"
                {...props}
            />
            <NavItem
                active
                link="#"
                text="Case Studies"
                {...props}
            />
            <NavItem
                disabled
                link="#"
                text="Service"
                {...props}
            />
            <NavItem
                link="#"
                text="Contacts"
                {...props}
            />
            </Nav>
        </Flex>
        <Flex orientation="column">
            <Caption  
                marginBottom="sm" 
            >
                Subtle Variant
            </Caption>
            <Nav
                link="#"
                variant="subtle"
                {...props}
            >
            <NavItem
                link="#"
                text="About"
                {...props}
            />
            <NavItem
                active
                link="#"
                text="Case Studies"
                {...props}
            />
            <NavItem
                disabled
                link="#"
                text="Service"
                {...props}
            />
            <NavItem
                link="#"
                text="Contacts"
                {...props}
            />
            </Nav>
        </Flex>
        <Flex orientation="column">
            <Caption  
                marginBottom="sm" 
            >
                Bold Variant
            </Caption>
            <Nav
                link="#"
                variant="bold"
                {...props}
            >
                <NavItem
                    link="#"
                    text="About"
                    {...props}
                />
                <NavItem
                    active
                    link="#"
                    text="Case Studies"
                    {...props}
                />
                <NavItem
                    disabled
                    link="#"
                    text="Service"
                    {...props}
                />
                <NavItem
                    link="#"
                    text="Contacts"
                    {...props}
                />
            </Nav>
        </Flex>
    </Flex>
  )
}

export default VerticalNavDisabled