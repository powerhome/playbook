import React from 'react'
import { Collapsible, useCollapsible, Flex, Title, List, ListItem } from '../..'

const CollapsibleCustomMainWithIcon = (props) => {
  const [isCollapsed, setIsCollapsed] = useCollapsible(true)

  return (
    <>
      <Collapsible collapsed={isCollapsed}>
        <Flex
          align="center"
          gap="sm"
          justify="between"
          position="sticky"
          top="0"
          cursor="pointer"
          htmlOptions={{onClick:() => setIsCollapsed(!isCollapsed)}}
        >
          <Title
            dark={props.dark}
            size={4}
            text="Custom Main Section"
          />
          <Collapsible.Icon collapsed={isCollapsed} />
        </Flex>
        <Collapsible.Content 
            padding="none"
        >
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

export default CollapsibleCustomMainWithIcon
