import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import defaultColors from "../tokens/exports/_colors.scss";

type OverlayProps = {
    aria?: { [key: string]: string },
    className?: string,
    children: React.ReactNode[] | React.ReactNode,
    color: "white" | "bg_light" | "card_dark" | "bg_dark",
    data?: { [key: string]: string },
    htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
    id?: string,
    layout: { [key: string]: string },
}

const previousOverlayDirectionMap: { [key: string]: string } = {
    "bottom": "to top",
    "top": "to bottom",
    "left-right": "to right",
    "top-bottom": "to top",
}

const subsequentOverlayDirectionMap: { [key: string]: string } = {
    "bottom": "to top",
    "top": "to bottom",
    "left-right": "to left",
    "top-bottom": "to bottom",
}

const Overlay = (props: OverlayProps) => {
    const {
        aria = {},
        className,
        children,
        color = "white",
        data = {},
        htmlOptions = {},
        id,
        layout = { "bottom": "100%" },
    } = props

    const ariaProps = buildAriaProps(aria)
    const dataProps = buildDataProps(data)
    const classes = classnames(buildCss('pb_overlay'), globalProps(props), className)
    const htmlProps = buildHtmlProps(htmlOptions)

    const getPosition = () => {
        return Object.keys(layout)[0]
    }

    const getSize = () => {
        return Object.values(layout)[0]
    }

    const getPreviousOverlayDirection = () => {
        return previousOverlayDirectionMap[getPosition()]
    }

    const getSubsequentOverlayDirection = () => {
        return subsequentOverlayDirectionMap[getPosition()]
    }

    const hasSubsequentOverlay = getPosition() === "left-right" || getPosition() === "top-bottom"

    const previousOverlay = `linear-gradient(${getPreviousOverlayDirection()}, ${defaultColors[color]} 0%, transparent ${getSize()})`
    const subsequentOverlay = `linear-gradient(${getSubsequentOverlayDirection()}, ${defaultColors[color]} 0%, transparent ${getSize()})`

    return (
        <div
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
        >
            <div className="overlay-container">
                <div className="overlay"
                    style={{ background: previousOverlay }} />

                {children}

                { hasSubsequentOverlay &&
                    <div className="overlay"
                        style={{ background: subsequentOverlay }} />
                }
            </div>
        </div>
    )
}

export default Overlay
