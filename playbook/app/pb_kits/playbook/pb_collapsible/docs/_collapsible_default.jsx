import React from 'react'
import { Collapsible, useCollapsible, Button, Background, Flex, Title, IconCircle, List, ListItem, Checkbox, TextInput } from '../..'

const CollapsibleDefault = () => {
  const [isCollapsed, setIsCollapsed] = useCollapsible(true)

  return (
  <>
    <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        padding="none"
        variant="link"
    >
      {isCollapsed ? "Expand All" : "Collapse All"}
    </Button>

    <Collapsible
        collapsed={isCollapsed}
        icon={["plus", "minus"]}
        padding="none"
    >
      <Background 
          backgroundColor="white" 
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
