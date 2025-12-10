import React from 'react'
import PropTypes from 'prop-types';

import Collapsible from '../../pb_collapsible/_collapsible'
import useCollapsible from '../../pb_collapsible/useCollapsible'
import Button from '../../pb_button/_button'

const CollapsibleState = (props) => {
  const [isCollapsed, setIsCollapsed] = useCollapsible(true)

  return (
  <>
    <Button
        dark={props.dark}
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
      <Collapsible.Main padding="sm" 
          {...props}
      >
          <div>{"Main Section"}</div>
      </Collapsible.Main>
      <Collapsible.Content>
          <div>
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit."
            }
          </div>
      </Collapsible.Content>
    </Collapsible>
    <Collapsible
        collapsed={isCollapsed}
        icon={["plus", "minus"]}
        padding="none"
    >
      <Collapsible.Main padding="sm" 
          {...props}
      >
          <div>{"Main Section"}</div>
      </Collapsible.Main>
      <Collapsible.Content>
          <div>
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit."
            }
          </div>
      </Collapsible.Content>
    </Collapsible>
    <Collapsible
        collapsed={isCollapsed}
        icon={["plus", "minus"]}
        padding="none"
    >
        <Collapsible.Main padding="sm" 
            {...props}
        >
          <div>{"Main Section"}</div>
        </Collapsible.Main>
        <Collapsible.Content>
          <div>
            {
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel erat sed purus hendrerit viverra. Duis et vestibulum metus. Sed consequat ut ante non vehicula. Etiam nunc massa, pharetra vel quam id, posuere rhoncus quam. Quisque imperdiet arcu enim, nec aliquet justo auctor eget. Curabitur in metus nec nunc rhoncus faucibus vitae ac elit."
            }
          </div>
        </Collapsible.Content>
    </Collapsible>
  </>
  )
}

CollapsibleState.propTypes = {
  dark: PropTypes.bool,
}

export default CollapsibleState