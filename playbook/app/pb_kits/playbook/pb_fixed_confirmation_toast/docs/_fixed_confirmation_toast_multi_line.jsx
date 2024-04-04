import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import FixedConfirmationToast from '../_fixed_confirmation_toast'

const FixedConfirmationToastMultiLine = (props) => {

    const [openShort, setOpenShort] = useState(false)
    const [openLong, setOpenLong] = useState(false)

    const handleClickShort = () => {
        setOpenShort(true)
    }
    const handleClickLong= () => {
        setOpenLong(true)
    }

    const handleCloseShort = () => {
        setOpenShort(false)
    }

    const handleCloseLong= () => {
        setOpenLong(false)
    }

    return (
        <>
            <Button
                onClick={handleClickShort}
                text="Short Multiline"
                variant="secondary"
                {...props}
            />
            {' '}
            <Button
                onClick={handleClickLong}
                text="Long Multiline"
                variant="secondary"
                {...props}
            />

            <FixedConfirmationToast
                closeable 
                horizontal='center'
                multiLine
                onClose={handleCloseShort}
                open={openShort}
                status='tip'
                text='Multi-line is used when the given text will not fit on one line.'
                vertical='top'
                {...props}
            />

            <FixedConfirmationToast
                closeable
                horizontal='center'
                multiLine
                onClose={handleCloseLong}
                open={openLong}
                status='tip'
                text='Multi-line is used when the given text will not fit on one line. Using Multi Line allows the height of the confirmation toast to grow. Simply resize the screen to see the fixed confirmation toast wrap the text.'
                vertical='top'
                {...props}
            />
        </>
    )
}

export default FixedConfirmationToastMultiLine
