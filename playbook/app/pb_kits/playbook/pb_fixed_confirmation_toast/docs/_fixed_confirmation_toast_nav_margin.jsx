import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import FixedConfirmationToast from '../_fixed_confirmation_toast'

const FixedConfirmationToastNavMargin = (props) => {
  const [openToast, setOpenToast] = useState(false)


  const handleClickShort = () => {
    setOpenToast(true)
  }

  const handleCloseShort = () => {
    setOpenToast(false)
  }

  return (
    <div>
      <Button
          onClick={handleClickShort}
          text="Top Nav Margin"
          variant="secondary"
          {...props}
      />

      <FixedConfirmationToast
          closeable
          horizontal='center'
          navMarginTop
          onClose={handleCloseShort}
          open={openToast}
          status="tip"
          text="Top nav Margin."
          vertical='top'
          {...props}
      />
    </div>
  )
}

export default FixedConfirmationToastNavMargin