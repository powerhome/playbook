import React from 'react'
import Tooltip from '../_tooltip'
import Button from '../../pb_button/_button'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'

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
          maxHeight='100px'
          placement='top'
          text="I have a maxHeight of 100px! Lorem ipsum dolor sit amet consectetur adipisicing elit."
          width='250px'
          {...props}
      >
        <Button text="maxHeight"/>
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip
          maxWidth='150px'
          placement='top'
          text="I have a maxWidth of 150px! Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
