import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import FixedConfirmationToast from '../_fixed_confirmation_toast'

const FixedConfirmationToastAutoClose = (props) => {

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
                text="Show Auto Close Toast"
                variant="secondary"
                {...props}
            />
            {' '}
            <Button
                onClick={handleClickCloseable}
                text="Show Closeable Auto Close Toast"
                variant="secondary"
                {...props}
            />

            <FixedConfirmationToast
                autoClose={3000}
                horizontal='center'
                onClose={handleClose}
                open={open}
                status='tip'
                text='I will disappear in 3 seconds.'
                vertical='top'
                {...props}
            />

            <FixedConfirmationToast
                autoClose={10000}
                closeable
                horizontal='center'
                onClose={handleCloseCloseable}
                open={openCloseable}
                status='tip'
                text='I will disappear in 10 seconds.'
                vertical='top'
                {...props}
            />
        </>
    )
}

export default FixedConfirmationToastAutoClose
