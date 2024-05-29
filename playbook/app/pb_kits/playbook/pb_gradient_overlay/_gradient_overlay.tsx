import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type GradientOverlayProps = {
    aria?: { [key: string]: string },
    className?: string,
    children: React.ReactNode[] | React.ReactNode,
    data?: { [key: string]: string },
    direction: "right" | "left" | "bottom" | "top",
    end: string,
    gradientColors: [string, string],
    id?: string,
    start: string,
}

const GradientOverlay = (props: GradientOverlayProps) => {
    const {
        aria = {},
        className,
        children,
        data = {},
        direction = "right",
        end = "100%",
        gradientColors = ["transparent", "white"],
        id,
        start = "0%",
    } = props

    const ariaProps = buildAriaProps(aria)
    const dataProps = buildDataProps(data)
    const classes = classnames(buildCss('pb_gradient_overlay'), globalProps(props), className)
    const gradient = `linear-gradient(to ${direction}, ${gradientColors[0]} ${start}, ${gradientColors[1]} ${end})`

    return (
        <div
            {...ariaProps}
            {...dataProps}
            className={classes}
            id={id}
        >
            <div className="gradient-overlay-container">
                <div className="gradient-overlay"
                    style={{ background: gradient }} />
                {children}
            </div>
        </div>
    )
}

export default GradientOverlay
