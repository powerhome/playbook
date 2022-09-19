import React from 'react'
import Icon from '../pb_icon/_icon'

type CloseIconProps = {
  onClose: () => any,
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
