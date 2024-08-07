import React from 'react'
import Icon from '../pb_icon/_icon'

import { getAllIcons } from "../utilities/icons/allicons"

type CloseIconProps = {
  onClose: () => void,
}

export const CloseIcon = (props: CloseIconProps): React.ReactElement => {
  const { onClose } = props
  const timesIcon = getAllIcons()["times"]
  return (
    <div
        className="pb_dialog_close_icon"
        onClick={onClose}
    >
      <Icon
          className="svg-inline--fa"
          customIcon={timesIcon.icon as unknown as { [key: string]: SVGElement }}
          fixedWidth
          icon=""
      />
    </div>
  )
}
