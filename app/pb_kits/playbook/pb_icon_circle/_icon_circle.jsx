/* @flow */

import React from 'react'
import { Icon } from '../'

const IconCircleProps = {
  className: String,
  icon: String,
  id: String,
  size: String,
  variant: String,
}

const IconCircle = ({
  icon,
  size='md',
  variant='default',
}: IconCircleProps) => (
  <div className={`pb_icon_circle_kit_${size}_${variant}`}>
    <Icon icon={icon} />
  </div>
)

export default IconCircle
