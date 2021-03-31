/* @flow */

import React, { useEffect, useRef } from 'react'
import { components } from 'react-select'
import { Flex, Icon } from '../../'

const Input = (props: any) => {
  const { plusIcon } = props.selectProps
  const inputWrapper = useRef(null)

  if (plusIcon) {
    useEffect(() => {
      const plusIcon = inputWrapper.current.querySelector('.typeahead-plus-icon')
      const values = props.selectProps.value
      if (!values || values.length == 0){
        const offset = inputWrapper.current.parentElement.querySelector('.placeholder').clientWidth
        plusIcon.style.marginLeft = `${offset + 2}px`
      } else {
        plusIcon.style.marginLeft = '0px'
      }
    })
  }

  return (
    <Flex
        align="center"
        ref={inputWrapper}
    >
      <If condition={plusIcon}>
        <Icon
            className="typeahead-plus-icon"
            icon="plus"
        />
      </If>
      <components.Input
          className="input"
          {...props}
      />
    </Flex>
  )
}

export default Input
