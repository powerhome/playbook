import React from 'react'
import { Collapsible, useCollapsible, Background, Flex, Title, IconCircle, List, ListItem, Checkbox, TextInput } from '../..'

const CollapsibleDefault = () => {
  const [isCollapsed, setIsCollapsed] = useCollapsible(true)

  return (
  <>
    <Collapsible
        collapsed={isCollapsed}
        padding="none"
    >
      <div onClick={() => setIsCollapsed(!isCollapsed)}>
          <Background 
              backgroundColor="white" 
              cursor="pointer"
              padding="sm"
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
                    text="Section title" 
                />
                <IconCircle 
                    icon="check" 
                    size="xs" 
                />
              </Flex>
          </Background>
      </div>  
      <Collapsible.Content padding="none">
          <div>
          <List>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
                  padding="none" 
              >
                <Checkbox 
                    padding="sm" 
                    text="checklist item" 
                />
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
                  padding="none" 
              >
                <Checkbox 
                    padding="sm" 
                    text="checklist item" 
                />
              </ListItem><ListItem 
                  align="stretch"
                  flexDirection="column" 
                  padding="none" 
              >
                <Checkbox 
                    padding="sm" 
                    text="checklist item" 
                />
              </ListItem><ListItem 
                  align="stretch"
                  flexDirection="column" 
                  padding="none" 
              >
                <Checkbox 
                    padding="sm" 
                    text="checklist item" 
                />
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
                  padding="none" 
              >
                <Checkbox 
                    padding="sm" 
                    text="checklist item" 
                />
                <TextInput 
                    marginX="sm" 
                    placeholder="Describe location" 
                />
              </ListItem>
            </List>
          </div>
      </Collapsible.Content>
    </Collapsible>
   
  </>
  )
}

export default CollapsibleDefault
