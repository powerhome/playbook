/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { Icon, Title } from '../'
import { globalProps } from '../utilities/globalProps.js'

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
  status?: "success" | "error" | "neutral" | "tip",
  text: string,
}

const FixedConfirmationToast = (props: FixedConfirmationToastProps) => {
  const [showToast, toggleToast] = useState(true)
  const { className, closeable = false, status = 'neutral', text } = props
  const css = classnames(
    `pb_fixed_confirmation_toast_kit_${status}`,
    globalProps(props),
    className
  )
  const icon = iconMap[status]

  return (
    <If condition={showToast}>
      <div
          className={css}
          onClick={closeable && (() => toggleToast(false))}
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
