import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, globalInlineProps } from '../utilities/globalProps'
import OverlayPercentage from './subcomponents/_overlay_percentage'
import OverlayToken from './subcomponents/_overlay_token'

export type OverlayChildrenProps = {
    children: React.ReactNode[] | React.ReactNode,
    color: "card_light" | "bg_light" | "card_dark" | "bg_dark",
    dynamic?: boolean,
    position: string,
    size: string,
}

type OverlayProps = {
    aria?: { [key: string]: string },
    className?: string,
    children: React.ReactNode[] | React.ReactNode,
    color: "card_light" | "bg_light" | "card_dark" | "bg_dark",
    data?: { [key: string]: string },
    dynamic?: false,
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
        dynamic = false,
        htmlOptions = {},
        id,
        layout = { "bottom": "full" },
    } = props

    const ariaProps = buildAriaProps(aria)
    const dataProps = buildDataProps(data)
    const classes = classnames(buildCss('pb_overlay'), globalProps(props), className)
    const htmlProps = buildHtmlProps(htmlOptions)
    const dynamicInlineProps = globalInlineProps(props)

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
            style={dynamicInlineProps}
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
                    dynamic: dynamic,
                    position: getPosition(),
                    size: getSize()
                })
            }
        </div>
    )
}

export default Overlay
