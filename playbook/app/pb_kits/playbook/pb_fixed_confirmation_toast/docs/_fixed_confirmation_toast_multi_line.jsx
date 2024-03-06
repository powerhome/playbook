
import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import FixedConfirmationToast from '../_fixed_confirmation_toast'

const FixedConfirmationToastPositions = (props) => {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  })

  const { vertical, horizontal, open } = state

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  return (
    <div>
      <Button
          onClick={handleClick({
            horizontal: 'center',
            open: true,
            vertical: 'top',
          })}
          text="Multiline Example"
          variant="primary"
          {...props}
      />
      {' '}
      <FixedConfirmationToast
          closeable
          horizontal={horizontal}
          multiLine
          onClose={handleClose}
          open={open}
          status="tip"
          text={`Multi-line is used when the given text will not fit on one line. Using Multi Line allows the height of the confirmation toast to grow. Simply resize the screen to see the fixed confirmation toast wrap the text.`}
          vertical={vertical}
          {...props}
      />
    </div>
  )
}

export default FixedConfirmationToastPositions
