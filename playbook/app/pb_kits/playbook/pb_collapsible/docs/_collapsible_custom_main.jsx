import React from 'react'
import { Collapsible, useCollapsible, Flex, Title, List, ListItem } from '../..'

const CollapsibleCustomMain = (props) => {
  const [isCollapsed, setIsCollapsed] = useCollapsible(true)

  return (
  <>
    <Collapsible
        collapsed={isCollapsed}
    >
        <Flex 
            position="sticky" 
            top="0" 
            cursor="pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
            align="center" 
            gap="sm"
            justify="between" 
        >
            <Title 
                dark={props.dark}
                size={4} 
                text="Custom Main Section"
            />
        </Flex>
      <Collapsible.Content padding="none">
          <div>
          <List>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                Checklist item
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                Checklist item
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                Checklist item
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                Checklist item
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                Checklist item
              </ListItem>
            </List>
          </div>
      </Collapsible.Content>
    </Collapsible>
  </>
  )
}

export default CollapsibleCustomMain
