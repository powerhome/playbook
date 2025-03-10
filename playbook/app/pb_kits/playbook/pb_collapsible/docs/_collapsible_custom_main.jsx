import React from 'react'
import PropTypes from 'prop-types'

import Collapsible from '../../pb_collapsible/_collapsible'
import useCollapsible from '../../pb_collapsible/useCollapsible'
import Flex from '../../pb_flex/_flex'
import Title from '../../pb_title/_title'
import List from '../../pb_list/_list'
import ListItem from '../../pb_list/_list_item'

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
