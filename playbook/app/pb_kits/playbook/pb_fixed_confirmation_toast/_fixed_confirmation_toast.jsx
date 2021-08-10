/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'

import Icon from '../pb_icon/_icon'
import Title from '../pb_title/_title'

const iconMap = {
  success: 'check',
  error: 'exclamation-triangle',
  neutral: 'info-circle',
  tip: 'info-circle',
}

type FixedConfirmationToastProps = {
  className?: string,
  closeable?: boolean,
  data?: string,
  id?: string,
  multiLine?: boolean,
  status?: 'success' | 'error' | 'neutral' | 'tip',
  text: string,
}

const FixedConfirmationToast = (props: FixedConfirmationToastProps) => {
  const [showToast, toggleToast] = useState(true)
  const { className, closeable = false, multiLine = false, status = 'neutral', text } = props
  const css = classnames(
    `pb_fixed_confirmation_toast_kit_${status}`,
    { '_multi_line': multiLine },
    globalProps(props),
    className
  )
  const icon = iconMap[status]

  const handleClick = () => {
    toggleToast(!closeable)
  }

  return (
    <If condition={showToast}>
      <div
          className={css}
          onClick={handleClick}
      >
        <If condition={icon}>
          <Icon
              className="pb_icon"
              fixedWidth
              icon={icon}
          />
        </If>
        <Title
            className="pb_fixed_confirmation_toast_text"
            size={4}
            text={text}
        />
        <If condition={closeable}>
          <Icon
              className="pb_icon"
              fixedWidth={false}
              icon="times"
          />
        </If>
      </div>
    </If>
  )
}

export default FixedConfirmationToast
