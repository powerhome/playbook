import React from 'react'
import PropTypes from 'prop-types'
import { Collapsible, useCollapsible, Flex, Title, List, ListItem } from '../..'

const CollapsibleCustomMain = (props) => {
  const [isCollapsed, setIsCollapsed] = useCollapsible(true)

  return (
    <>
      <Collapsible collapsed={isCollapsed}>
        <Flex
            align="center"
            cursor="pointer"
            gap="sm"
            htmlOptions={{onClick:() => setIsCollapsed(!isCollapsed)}}
            justify="between"
            position="sticky"
            top="0"
        >
          <Title 
              dark={props.dark} 
              size={4} 
              text="Custom Main Section" />
        </Flex>
        <Collapsible.Content 
            padding="none">
          <div>
            <List>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                {"Checklist item"}
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                {"Checklist item"}
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                {"Checklist item"}
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                {"Checklist item"}
              </ListItem>
              <ListItem 
                  align="stretch"
                  flexDirection="column" 
              >
                {"Checklist item"}
              </ListItem>
            </List>
          </div>
      </Collapsible.Content>
    </Collapsible>
  </>
  )
}

CollapsibleCustomMain.propTypes = {
  dark: PropTypes.bool,
}

export default CollapsibleCustomMain
