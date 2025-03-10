import React, { useState } from 'react'
import Button from '../../pb_button/_button'
import Body from '../../pb_body/_body'
import Tooltip from '../../pb_tooltip/_tooltip'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

const TooltipShowTooltipReact = (props) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
   <Flex 
       flexDirection='column'
       gap='md'
       wrap
   >
    <FlexItem>
      <Button 
          onClick={()=> setShowTooltip(!showTooltip)}
          text="Toggle state"
      />
    </FlexItem>
    <FlexItem>
      <Body >
        <p>
          {'Tooltip is: '}
          <code>{showTooltip ? "enabled" : "disabled"}</code>
        </p>
      </Body>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          placement='right'
          showTooltip={showTooltip}
          text='Tooltip is enabled'
          zIndex={10}
          {...props}
      >
        {'Hover me.'}
      </Tooltip>
    </FlexItem>

   </Flex>
  )
}

export default TooltipShowTooltipReact
