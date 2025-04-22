import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, globalInlineProps } from '../utilities/globalProps'
import OverlayPercentage from './subcomponents/_overlay_percentage'
import OverlayToken from './subcomponents/_overlay_token'

export type OverlayChildrenProps = {
    children: React.ReactNode[] | React.ReactNode,
    color: "card_light" | "bg_light" | "card_dark" | "bg_dark" | "black" | "white" | "success" | "error",
    dynamic?: boolean,
    position: string,
    size: string,
    scrollBarNone?: boolean,
}

type OverlayProps = {
    aria?: { [key: string]: string },
    className?: string,
    children: React.ReactNode[] | React.ReactNode,
    color: "card_light" | "bg_light" | "card_dark" | "bg_dark" | "black" | "white" | "success" | "error",
    data?: { [key: string]: string },
    dynamic?: false,
    fullScreen?: boolean,
    gradient?: boolean,
    htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
    id?: string,
    layout: { [key: string]: string },
    opacity: 'opacity_1' | 'opacity_2' | 'opacity_3' | 'opacity_4' | 'opacity_5' | 'opacity_6' | 'opacity_7' | 'opacity_8' | 'opacity_9' | 'opacity_10',
    scrollBarNone?: boolean,

}

const Overlay = (props: OverlayProps) => {
    const {
        aria = {},
        className,
        children,
        color = "card_light",
        data = {},
        dynamic = false,
        fullScreen = false,
        gradient = true,
        htmlOptions = {},
        id,
        layout = { "bottom": "full" },
        opacity,
        scrollBarNone = false,
    } = props

    const ariaProps = buildAriaProps(aria)
    const dataProps = buildDataProps(data)
    const classes = classnames(
        buildCss('pb_overlay'),
        { 'overlay-hide-scrollbar': scrollBarNone },
        { 'overlay-full-screen': fullScreen },
        globalProps(props),
        gradient === false ? 'no_gradient' : '',
        opacity,
        className
    )
    const htmlProps = buildHtmlProps(htmlOptions)
    const dynamicInlineProps = globalInlineProps(props)

    const getPosition = () => {
        return Object.keys(layout)[0]
    }

    const getSize = () => {
        if (fullScreen) {
            return "100%"
        }
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
            style={{
                ...(fullScreen ? {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999,
                } : {}),
                ...dynamicInlineProps
            }}
        >
            {isSizePercentage ?
                OverlayPercentage({
                    children,
                    color,
                    position: getPosition(),
                    scrollBarNone,
                    size: getSize()
                }) : OverlayToken({
                    children,
                    color,
                    dynamic: dynamic,
                    position: getPosition(),
                    scrollBarNone,
                    size: getSize()
                })
            }
        </div>
    )
}

export default Overlay
