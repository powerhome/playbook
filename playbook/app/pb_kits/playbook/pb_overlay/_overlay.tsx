import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import OverlayPercentage from './subcomponents/_overlay_percentage'
import OverlayToken from './subcomponents/_overlay_token'

export type OverlayChildrenProps = {
    children: React.ReactNode[] | React.ReactNode,
    color: "card_light" | "bg_light" | "card_dark" | "bg_dark",
    position: string,
    size: string,
}

type OverlayProps = {
    aria?: { [key: string]: string },
    className?: string,
    children: React.ReactNode[] | React.ReactNode,
    color: "card_light" | "bg_light" | "card_dark" | "bg_dark",
    data?: { [key: string]: string },
    htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
    id?: string,
    layout: { [key: string]: string },
}

const Overlay = (props: OverlayProps) => {
    const {
        aria = {},
        className,
        children,
        color = "card_light",
        data = {},
        htmlOptions = {},
        id,
        layout = { "bottom": "xl" },
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

    const isSizePercentage = getSize().includes("%")

    return (
        <div
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
        >
            {isSizePercentage ?
                OverlayPercentage({
                    children,
                    color,
                    position: getPosition(),
                    size: getSize()
                }) : OverlayToken({
                    children,
                    color,
                    position: getPosition(),
                    size: getSize()
                })
            }
        </div>
    )
}

export default Overlay
