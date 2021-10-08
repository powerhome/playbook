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
          text="Top Center"
          variant="secondary"
          {...props}
      />
      {' '}
      <Button
          onClick={handleClick({
            horizontal: 'left',
            open: true,
            vertical: 'top',
          })}
          text="Top Left"
          variant="secondary"
          {...props}
      />
      {' '}
      <Button
          onClick={handleClick({
            horizontal: 'right',
            open: true,
            vertical: 'top',
          })}
          text="Top Right"
          variant="secondary"
          {...props}
      />
      {' '}
      <Button
          onClick={handleClick({
            horizontal: 'center',
            open: true,
            vertical: 'bottom',
          })}
          text="Bottom Center"
          variant="secondary"
          {...props}
      />
      {' '}
      <Button
          onClick={handleClick({
            horizontal: 'left',
            open: true,
            vertical: 'bottom',
          })}
          text="Bottom Left"
          variant="secondary"
          {...props}
      />
      {' '}
      <Button
          onClick={handleClick({
            horizontal: 'right',
            open: true,
            vertical: 'bottom',
          })}
          text="Bottom Right"
          variant="secondary"
          {...props}
      />

      <FixedConfirmationToast
          closeable
          horizontal={horizontal}
          onClose={handleClose}
          open={open}
          status="neutral"
          text={`${vertical} ${horizontal}`}
          vertical={vertical}
          {...props}
      />
    </div>
  )
}

export default FixedConfirmationToastPositions
