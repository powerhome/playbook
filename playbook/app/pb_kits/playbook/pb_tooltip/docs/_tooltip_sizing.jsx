import React from 'react'
import { Button, Tooltip, Flex, FlexItem } from 'playbook-ui';

const TooltipSizing = (props) => {

  return (
   <Flex
       flexDirection='row'
       gap='md'
       wrap
   >
    <FlexItem>
      <Tooltip
          height='150px'
          placement='top'
          text="I'm 150px high and 100px wide!"
          width='100px'
          {...props}
      >
        <Button text="Height and Width"/>
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip
          maxHeight='150px'
          placement='top'
          text="I have a maxHeight of 150px! Here is some more text to show the maxHeight."
          width='200px'
          {...props}
      >
        <Button text="maxHeight"/>
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip
          maxWidth='150px'
          placement='top'
          text="I have a maxWidth of 150px! Here is some more text to show the maxWidth."
          {...props}
      >
        <Button text="maxWidth"/>
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip
          minWidth='300px'
          placement='top'
          text="I have a minWidth of 300px!"
          {...props}
      >
        <Button text="minWidth"/>
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip
          maxWidth='150px'
          minHeight='300px'
          placement='top'
          text="I have a minHeight of 300px!"
          {...props}
      >
        <Button text="minHeight"/>
      </Tooltip>
    </FlexItem>
   </Flex>
  )
}

export default TooltipSizing
