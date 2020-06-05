/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Button, Icon } from '../'

import type { Callback } from '../types'

import {
  noop,
} from '../utilities/props'

import { spacing } from '../utilities/spacing.js'

type CircleIconButtonProps = {
  className?: String,
  dark?: Boolean,
  disabled?: Boolean,
  icon: String,
  id?: String,
  link?: String,
  onClick?: Callback,
  newWindow?: Boolean,
  type?: 'button' | 'submit' | 'reset',
  variant?: 'primary' | 'secondary' | 'link',
}

const CircleIconButton = (props: CircleIconButtonProps) => {
  const {
    dark,
    disabled,
    icon,
    onClick = noop,
    type,
    link,
    newWindow,
    variant,
  } = props

  return (
    <div className={classnames('pb_circle_icon_button_kit', spacing(props))}>
      <Button
          dark={dark}
          disabled={disabled}
          link={link}
          newWindow={newWindow}
          onClick={onClick}
          text={null}
          type={type}
          variant={variant}
      >
        <Icon
            fixedWidth
            icon={icon}
        />
      </Button>
    </div>
  )
}

export default CircleIconButton
