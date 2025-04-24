import React, { useState } from 'react'
import Overlay from '../../pb_overlay/_overlay'
import Button from '../../pb_button/_button'
import FixedConfirmationToast from '../../pb_fixed_confirmation_toast/_fixed_confirmation_toast'

const OverlayFullscreenBackground = () => {
  const [openBackground, setOpenBackground] = useState(false)

  const handleClickBackground = () => {
    setOpenBackground(true)
  }

  const handleCloseBackground = () => {
    setOpenBackground(false)
  }

  return (
    <>
      <div>
        <Button
            onClick={handleClickBackground}
            text="Background Dark"
            variant="secondary"
        />

        {openBackground && (
          <Overlay
              color="bg_dark"
              fullScreen
              gradient={false}
              opacity="opacity_4"
          >
            <FixedConfirmationToast
                closeable
                horizontal='center'
                onClose={handleCloseBackground}
                open={openBackground}
                status="tip"
                text='Fullscreen Overlay with color set to Background Dark.'
                vertical='top'
            />
          </Overlay>
        )}
      </div>
    </>
  )
}

export default OverlayFullscreenBackground