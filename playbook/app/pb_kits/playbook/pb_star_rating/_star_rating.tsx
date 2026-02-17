import React from "react"
import classnames from "classnames"

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Caption from '../pb_caption/_caption'
import Body from '../pb_body/_body'
import Title from '../pb_title/_title'
import StarRatingInteractive from "./subcomponents/_star_rating_interactive"
import StarRatingDisplay from "./subcomponents/_star_rating_display"

type StarRatingProps = {
    aria?: { [key: string]: string },
    className?: string,
    data?: { [key: string]: string },
    dark?: boolean,
    fixedWidth?: boolean,
    layoutOption?: "default" | "number" | "onestar",
    htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
    icon?: string,
    id?: string,
    label?: string,
    rating: number,
    denominator: number,
    colorOption?: "yellow" | "primary" | "subtle" | "outline",
    backgroundType?: "fill" | "outline",
    size?: "xs" | "sm" | "md" | "lg",
    variant?: "display" | "interactive",
    onClick?: (interactiveStarValue: number) => void,
} & GlobalProps

const StarRating = (props: StarRatingProps) => {
    const {
        aria = {},
        className,
        data = {},
        dark = false,
        layoutOption = "default",
        htmlOptions = {},
        id,
        label,
        rating = 0,
        denominator = 5,
        colorOption = "yellow",
        backgroundType = "fill",
        size = "sm",
        variant = "display",
        onClick,
    } = props
    const classes = classnames(buildCss('pb_star_rating_kit'), globalProps(props), className)
    const ariaProps = buildAriaProps(aria)
    const dataProps = buildDataProps(data)
    const htmlProps = buildHtmlProps(htmlOptions)
    const oneDecimalRating = rating.toFixed(1)

    return (
        <div
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
        >
            {layoutOption === "number" && (
                <>
                    {(size === 'xs' || size === 'sm') && (
                        <Caption
                            className="pb_star_rating_number_sm"
                            dark={dark}
                            paddingRight="xs"
                            size="xs"
                            text={oneDecimalRating.toString()}
                        />
                    )}
                    {size === 'md' && (
                        <Body
                            className="pb_star_rating_number_md"
                            color="light"
                            dark={dark}
                            paddingRight="xs"
                            text={oneDecimalRating.toString()}
                        />
                    )}
                    {size === 'lg' && (
                        <Title
                            bold={false}
                            className="pb_star_rating_number_lg"
                            color="light"
                            dark={dark}
                            paddingRight="sm"
                            size={2}
                            text={oneDecimalRating.toString()}
                        />
                    )}
                </>
            )}

            {variant === "display" && (
                <StarRatingDisplay
                    backgroundType={backgroundType}
                    colorOption={colorOption}
                    dark={dark}
                    denominator={denominator}
                    layoutOption={layoutOption}
                    rating={rating}
                    size={size}
                />
            )}

            {variant === "interactive" && (
                <StarRatingInteractive
                    backgroundType={backgroundType}
                    colorOption={colorOption}
                    dark={dark}
                    denominator={denominator}
                    label={label}
                    onClick={onClick}
                    size={size}
                />
            )}

            {layoutOption === "onestar" && (
                <>
                    {(size === 'xs' || size === 'sm') && (
                        <Caption
                            className="pb_star_rating_number_sm"
                            dark={dark}
                            size="xs"
                            text={`${rating.toString()} of ${denominator}`}
                        />
                    )}
                    {size === 'md' && (
                        <Body
                            className="pb_star_rating_number_md"
                            color="light"
                            dark={dark}
                            text={`${rating.toString()} of ${denominator}`}
                        />
                    )}
                    {size === 'lg' && (
                        <Title
                            bold={false}
                            className="pb_star_rating_number_lg"
                            color="light"
                            dark={dark}
                            size={2}
                            text={`${rating.toString()} of ${denominator}`}
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default StarRating
