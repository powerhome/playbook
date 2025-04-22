import React, { useState } from 'react'

import Overlay from '../../pb_overlay/_overlay'
import Button from '../../pb_button/_button'
import FixedConfirmationToast from '../../pb_fixed_confirmation_toast/_fixed_confirmation_toast'

const OverlayFullscreenOpacity = () => {
  const [openOpacity40, setOpenOpacity40] = useState(false)
  const [openOpacity80, setOpenOpacity80] = useState(false)

  const handleClickOpacity40 = () => {
    setOpenOpacity40(true)
  }
  const handleCloseOpacity40 = () => {
    setOpenOpacity40(false)
  }

  const handleClickOpacity80 = () => {
    setOpenOpacity80(true)
  }
  const handleCloseOpacity80 = () => {
    setOpenOpacity80(false)
  }

  return (
    <>
      <Button
          onClick={handleClickOpacity40}
          text="40% Opacity"
          variant="secondary"
      />
      {' '}
      <Button
          onClick={handleClickOpacity80}
          text="80% Opacity"
          variant="secondary"
      />

      {openOpacity40 && (
          <Overlay
              color="black"
              fullScreen
              gradient={false}
              opacity="opacity_4"
          >
            <FixedConfirmationToast
                closeable
                horizontal='center'
                onClose={handleCloseOpacity40}
                open={openOpacity40}
                status="tip"
                text='Lost connection. Check your internet connectivity.'
                vertical='top'
            />
          </Overlay>
      )}

      {openOpacity80 && (
          <Overlay
              color="black"
              fullScreen
              gradient={false}
              opacity="opacity_8"
          >
            <FixedConfirmationToast
                closeable
                display="block"
                horizontal='center'
                onClose={handleCloseOpacity80}
                open={openOpacity80}
                status="tip"
                text='Lost connection. Check your internet connectivity.'
                vertical='top'
            />
          </Overlay>
      )}
    </>
  )
}

export default OverlayFullscreenOpacity