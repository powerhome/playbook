import React from 'react'
import defaultColors from "../../tokens/exports/_colors.module.scss";
import { OverlayChildrenProps } from '../_overlay';


const previousOverlayDirectionMap: { [key: string]: string } = {
    "bottom": "to top",
    "top": "to bottom",
    "left": "to right",
    "right": "to left",
    "x": "to right",
    "y": "to top",
}

const subsequentOverlayDirectionMap: { [key: string]: string } = {
    ...previousOverlayDirectionMap,
    "x": "to left",
    "y": "to bottom",
}

const OverlayPercentage = (props: OverlayChildrenProps) => {
    const {
        children,
        color,
        position,
        size,
    } = props

    const getPreviousOverlayDirection = () => {
        return previousOverlayDirectionMap[position]
    }

    const getSubsequentOverlayDirection = () => {
        return subsequentOverlayDirectionMap[position]
    }

    const hasSubsequentOverlay = position === "x" || position === "y"

    const previousOverlay = `linear-gradient(${getPreviousOverlayDirection()}, ${defaultColors[color]} 0%, transparent ${size})`
    const subsequentOverlay = `linear-gradient(${getSubsequentOverlayDirection()}, ${defaultColors[color]} 0%, transparent ${size})`

    return (
        <>
            <div className="overlay_linear_gradient"
                style={{ background: previousOverlay }} />

            {children}

            { hasSubsequentOverlay &&
                <div className="overlay_linear_gradient"
                    style={{ background: subsequentOverlay }} />
            }       
        </>
    )
}

export default OverlayPercentage
