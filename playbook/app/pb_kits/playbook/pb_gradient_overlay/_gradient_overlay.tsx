import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type GradientOverlayProps = {
    aria?: { [key: string]: string },
    className?: string,
    children: React.ReactNode[] | React.ReactNode,
    data?: { [key: string]: string },
    direction: "right" | "left" | "bottom" | "top" | "sides" | "sandwich",
    end: string,
    gradientColors?: [string, string],
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

    const getPreviousGradientDirection = () => {
        return direction === "sides" ? "right" : direction === "sandwich" ? "top" : direction;
    }

    const getSubsequentGradientDirection = () => {
        return direction === "sides" ? "left" : direction === "sandwich" ? "bottom" : direction;
    }

    const ariaProps = buildAriaProps(aria)
    const dataProps = buildDataProps(data)
    const classes = classnames(buildCss('pb_gradient_overlay'), globalProps(props), className)

    const hasSubsequentGradient = direction === "sides" || direction === "sandwich"

    const previousGradientDirection = getPreviousGradientDirection()
    const subsequentGradientDirection = getSubsequentGradientDirection()

    const firstGradientColor = hasSubsequentGradient ? gradientColors[1] : gradientColors[0]
    const secondGradientColor = hasSubsequentGradient ? gradientColors[0] : gradientColors[1]

    const previousGradient = `linear-gradient(to ${previousGradientDirection}, ${firstGradientColor} ${start}, ${secondGradientColor} ${end})`
    const subsequentGradient = `linear-gradient(to ${subsequentGradientDirection}, ${firstGradientColor} ${start}, ${secondGradientColor} ${end})`

    return (
        <div
            {...ariaProps}
            {...dataProps}
            className={classes}
            id={id}
        >
            <div className="gradient-overlay-container">
                <div className="gradient-overlay"
                    style={{ background: previousGradient }} />

                {children}

                { hasSubsequentGradient &&
                    <div className="gradient-overlay"
                        style={{ background: subsequentGradient }} />
                }
            </div>
        </div>
    )
}

export default GradientOverlay
