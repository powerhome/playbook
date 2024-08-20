import React from 'react'
import { OverlayChildrenProps } from '../_overlay'

const previousOverlayDirectionMap: { [key: string]: string } = {
    "x": "left",
    "y": "top",
}

const subsequentOverlayDirectionMap: { [key: string]: string } = {
    "x": "right",
    "y": "bottom",
}

const OverlayToken = (props: OverlayChildrenProps) => {
    const {
        children,
        color,
        position,
        size,
    } = props

    const hasSubsequentOverlay = position === "x" || position === "y"

    const getPreviousOverlayDirection = () => {
        return hasSubsequentOverlay ? previousOverlayDirectionMap[position] : position
    }

    const getSubsequentOverlayDirection = () => {
        return hasSubsequentOverlay ? subsequentOverlayDirectionMap[position] : position
    }

    const previousOverlayClassName = `overlay_${color}_${getPreviousOverlayDirection()}_${size}`
    const subsequentOverlayClassName = `overlay_${color}_${getSubsequentOverlayDirection()}_${size}`

    return (
        <>
            <div className={previousOverlayClassName} />

            {children}

            { hasSubsequentOverlay &&
                <div className={subsequentOverlayClassName} />
            }
        </>
    )
}

export default OverlayToken
