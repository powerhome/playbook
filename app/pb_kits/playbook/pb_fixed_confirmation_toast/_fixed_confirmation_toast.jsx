/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import {
  Icon,
  Title,
} from '../'

type FixedConfirmationToastProps = {
  className?: String,
  data?: String,
  id?: String,
  status?: 'success' | 'error' | 'neutral',
  text: String,
}

const FixedConfirmationToast = ({
  className,
  status='neutral',
  text
}: FixedConfirmationToastProps) => {
  const css = classnames([
    `pb_fixed_confirmation_toast_kit_${status}`,
    className,
  ])

  const icon = (function(status) {
    switch (status) {
    case 'success':
      return 'check'
    case 'error':
      return 'exclamation-triangle'
    case 'neutral':
      return 'info-circle'
    default:
      return null
    }
  })(status)

  const displayIcon = function(icon) {
    if (icon) {
      return (
        <Icon
            className="pb_icon"
            fixed_width
            icon={icon}
        />
      )
    }
  }

  return (
    <div className={css}>
      {displayIcon(icon)}
      <Title
          className="pb_fixed_confirmation_toast_text"
          size={4}
          text={text}
      />
    </div>
  )
}

export default FixedConfirmationToast
