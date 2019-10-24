/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from "classnames"
import Icon from '../pb_icon/_icon.jsx'

type CircleIconButtonProps = {
  className?: String,
  data?: String,
  id?: String,
  icon: String,
  variant?: 'primary' | 'secondary',
  link: String,

}

const CircleIconButton = ({ className, data, id, icon, variant='primary', link}: CircleIconButtonProps) => {
  return (
    <div className={`pb_circle_icon_button_kit_${variant} ${className}`}>
      <a href={link}>
        <Icon icon={icon} fixed_width={true} />
      </a>
    </div>
  )
}

export default CircleIconButton
