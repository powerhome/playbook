

import React from 'react'
import { Icon } from '../'

type CloseIconProps = {
  onClose: () => mixed,
}

export const CloseIcon = (props: CloseIconProps) => {
  const { onClose } = props
  return (
    <div
        className="pb_dialog_close_icon"
        onClick={onClose}
    >
      <Icon
          fixedWidth
          icon="times"
      />
    </div>
  )
}
