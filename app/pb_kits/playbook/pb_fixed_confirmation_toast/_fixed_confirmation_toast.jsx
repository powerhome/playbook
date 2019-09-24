/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'
import Title from "../pb_title/_title.jsx"
import Icon from "../pb_icon/_icon.jsx"

type FixedConfirmationToastProps = {
  className?: String,
  data?: String,
  id?: String,
  status?: 'success' | 'error' | 'neutral',
  text: String,
}

const FixedConfirmationToast = ({
  className,
  data,
  id,
  status='neutral',
  text
}: FixedConfirmationToastProps) => {
  const css = classnames([
    `pb_fixed_confirmation_toast_kit_${status}`,
    className,
  ])

const icon = (function(status) {
  switch(status) {
    case "success":
      return "check";
    case "error":
      return "exclamation-triangle";
    case "neutral":
      return "info-circle";
    default:
      return null;
  }
})(status)

const displayIcon = function(icon) {
  if (icon) {
    return (
      <Icon icon={icon} fixed_width={true} className="pb_icon"/>
    )
  }
}

return (
  <div className={css}>
    {displayIcon(icon)}
    <Title size={4} className="pb_fixed_confirmation_toast_text" text={text} />
    </div>
  )
}

export default FixedConfirmationToast
