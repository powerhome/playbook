// @flow

import React, { useEffect, useRef , useState } from 'react'
import {  Flex, FlexItem, Tooltip } from '../..'

import './styles.css'

const TooltipShowTooltip = (props) => {
  const [showTooltipOne, setShowTooltipOne] = useState(true)
  const [showTooltipTwo, setShowTooltipTwo] = useState(true)

  const tooltipOneRef = useRef(null)
  const tooltipTwoRef = useRef(null)

  useEffect(() => {
    const checkTooltip = (ref, setShowTooltip) => {
      if (
        ref?.current &&
        ref.current.clientWidth === ref.current.scrollWidth
      ) {
        setShowTooltip(false);
      } else {
        setShowTooltip(true);
      }
    };
  
    checkTooltip(tooltipOneRef, setShowTooltipOne)
    checkTooltip(tooltipTwoRef, setShowTooltipTwo)
  }, [tooltipOneRef, tooltipTwoRef])

  return (
   <Flex 
       flexDirection='row'
       gap='md'
       justifyContent='center'
       wrap
   >
    <FlexItem>
      <Tooltip 
          className='tooltip-text-truncation short'
          ref={tooltipOneRef}
          showTooltip={showTooltipOne}
          text='Tooltip for truncation only'
          zIndex={10}
          {...props}
      >
        {'Tooltip for truncation only.'}
      </Tooltip>
    </FlexItem>
    <FlexItem>
      <Tooltip 
          className='tooltip-text-truncation long'
          ref={tooltipTwoRef}
          showTooltip={showTooltipTwo}
          text='Tooltip for truncation only.' 
          zIndex={10}
          {...props}
      >
        {'Tooltip for truncation only'}
      </Tooltip>
    </FlexItem>
   </Flex>
  )
}

export default TooltipShowTooltip
