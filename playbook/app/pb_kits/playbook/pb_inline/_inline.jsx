/* @flow */

import React, { useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import './_inline.scss'

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
    formInput,
    displayKit,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_inline'), globalProps(props), className)

  const [editing, setEditing] = useState(false)

  const ToggleClickHandler = () => {
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

  // console.log(formInput)

  const { kitType, size } = displayKit.props
  const textInputClassName = kitType ? (kitType.toLowerCase() + (size ? `_${size}` : '')) : ''

  const modifiedInput = React.cloneElement(formInput, {
    className: textInputClassName,
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
            onClick={() => ToggleClickHandler()}
            onFocus={() => ToggleClickHandler()}
            tabIndex="0"
        >
          {displayKit}
        </div>
      </If>

    </div>
  )
}

export default Inline
