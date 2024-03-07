import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import FixedConfirmationToast from '../_fixed_confirmation_toast'

const FixedConfirmationToastMultiLine = (props) => {

    const [open, setOpen] = useState(false)
    const [openCloseable, setOpenCloseable] = useState(false)

    const handleClick = () => {
        setOpen(true)
    }
    const handleClickCloseable = () => {
        setOpenCloseable(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseCloseable = () => {
        setOpenCloseable(false)
    }

    return (
        <>
            <Button
                onClick={handleClick}
                text="Short Multiline"
                variant="secondary"
                {...props}
            />
            {' '}
            <Button
                onClick={handleClickCloseable}
                text="Long Multiline"
                variant="secondary"
                {...props}
            />

            <FixedConfirmationToast
                closeable 
                horizontal='center'
                multiLine
                onClose={handleClose}
                open={open}
                status='tip'
                text='Multi-line is used when the given text will not fit on one line.'
                vertical='top'
                {...props}
            />

            <FixedConfirmationToast
                closeable
                horizontal='center'
                multiLine
                onClose={handleCloseCloseable}
                open={openCloseable}
                status='tip'
                text='Multi-line is used when the given text will not fit on one line. Using Multi Line allows the height of the confirmation toast to grow. Simply resize the screen to see the fixed confirmation toast wrap the text.'
                vertical='top'
                {...props}
            />
        </>
    )
}

export default FixedConfirmationToastMultiLine
