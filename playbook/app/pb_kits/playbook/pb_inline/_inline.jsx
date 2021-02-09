

/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { TextInput, Title } from '../'

type InlineProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
}

const Inline = (props: InlineProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    textInput,
    textKit,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_inline'), globalProps(props), className)

  const [editing, setEditing] = useState(false)
  const [inputText, setInputText] = useState("placeholder")

  const TitleClickHandler = () => {
    setEditing(!editing)
    console.log(!editing)
  }

  console.log(textKit.props.text)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <If condition={editing}>
        {textInput}
      </If>
      <If condition={!editing}>
        <div
            // className="pb_title_kit_4"
            onClick={()=> TitleClickHandler()}
        >
          {textKit}
        </div>
      </If>

    </div>
  )
}

export default Inline
