/* @flow */

import React from 'react'
import Icon from '../pb_icon/_icon'
import {IconSizes} from '../pb_icon/_icon'

type LightboxHeaderIconProps = {
  onClose: () => void,
  icon: string,
  iconSize: IconSizes,
}

export const LightboxHeaderIcon = (props: LightboxHeaderIconProps): React.ReactElement => {
  const { onClose, icon, iconSize } = props
  return (
    <div
        className="close-icon ml_sm"
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
