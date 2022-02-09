/* @flow */

import React from 'react'
import Icon from '../pb_icon/_icon'

type LightboxHeaderIconProps = {
  onClose: () => mixed,
  icon: string,
  iconSize: string,
}

export const LightboxHeaderIcon = (props: LightboxHeaderIconProps) => {
  const { onClose, icon, iconSize } = props
  return (
    <div
        className="close-icon"
        onClick={onClose}
    >
      <Icon
          fixedWidth
          icon={icon}
          size={iconSize}
      />
    </div>
  )
}
