import React from 'react'
import { Collapsible, useCollapsible, Background, Flex, Title, List, ListItem } from '../..'

const CollapsibleCustomMain = () => {
  const [isCollapsed, setIsCollapsed] = useCollapsible(true)

  return (
  <>
    <Collapsible
        collapsed={isCollapsed}
    >
          <Background 
              backgroundColor="white" 
              cursor="pointer"
              htmlOptions={{onClick:() => setIsCollapsed(!isCollapsed)}}
              position="sticky" 
              top="0" 
          >
              <Flex 
                  align="center" 
                  gap="sm"
                  justify="between" 
              >
                <Title 
                    size={4} 
                    text="Custom Main Section" 
                />
              </Flex>
          </Background>
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
