/* @flow */

import React from 'react'
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
  data?: string,
  id?: string,
  status?: "success" | "error" | "neutral" | "tip",
  text: string,
}

const FixedConfirmationToast = (props: FixedConfirmationToastProps) => {
  const { className, status = 'neutral', text } = props
  const css = classnames(
    className,
    `pb_fixed_confirmation_toast_kit_${status}`,
    globalProps(props)
  )
  const icon = iconMap[status]

  return (
    <div className={css}>
      <If condition={icon}>
        <Icon
            className="pb_icon"
            fixed_width
            icon={icon}
        />
      </If>
      <Title
          className="pb_fixed_confirmation_toast_text"
          size={4}
          text={text}
      />
    </div>
  )
}

export default FixedConfirmationToast
