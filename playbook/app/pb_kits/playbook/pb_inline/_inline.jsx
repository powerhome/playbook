/* @flow */

import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

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

  const TitleClickHandler = () => {
    setEditing(!editing)
  }

  useEffect(() => {
    if (editing) {
      modifiedInput.ref.current.focus()

      modifiedInput.ref.current.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          setEditing(!editing)
        }
      })
    }
  }, [editing])

  const modifiedInput = React.cloneElement(textInput, {
    className: textKit.type.name === 'Title' ? `title_${textKit.props.size}` : null,
    onBlur: () => setEditing(!editing),
    ref: useRef(null),
  })

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <If condition={editing}>
        {modifiedInput}
      </If>
      <If condition={!editing}>
        <div
            onClick={() => TitleClickHandler()}
            onFocus={() => TitleClickHandler()}
            tabIndex="0"
        >
          {textKit}
        </div>
      </If>

    </div>
  )
}

export default Inline
