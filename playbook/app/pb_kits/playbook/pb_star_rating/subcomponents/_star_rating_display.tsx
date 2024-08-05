import React from "react"
import { GlobalProps } from '../../utilities/globalProps'
import Icon from '../../pb_icon/_icon'
import Flex from '../../pb_flex/_flex'
import { getStarIconObject } from "../stars/utils"

type StarRatingDisplayProps = {
    backgroundType: "fill" | "outline",
    colorOption: "yellow" | "primary" | "subtle" | "outline",
    dark: boolean,
    denominator: number,
    layoutOption: "default" | "number" | "onestar",
    rating: number,
    size: "xs" | "sm" | "md" | "lg",
} & GlobalProps

const StarRatingDisplay = (props: StarRatingDisplayProps) => {
    const {
        backgroundType,
        colorOption,
        dark,
        denominator,
        layoutOption,
        rating,
        size,
    } = props
    const denominatorStyle = layoutOption === "onestar" ? 1 : denominator
    const activeStars = Math.round(rating) > denominatorStyle ? denominatorStyle : Math.round(rating)
    const emptyStars = denominatorStyle - Math.round(rating) < 0 ? 0 : denominatorStyle - Math.round(rating)
    const starIcon = getStarIconObject(backgroundType, colorOption, dark, size)

    return (
        <Flex className="star_flex_area">
            {[...Array(activeStars)].map((_, index) => (
                <React.Fragment key={index}>
                    <Icon
                        className={starIcon[colorOption].className}
                        customIcon={starIcon[colorOption].icon as unknown as { [key: string]: SVGElement }}
                        icon=""
                        tabIndex={0}
                    />
                </React.Fragment>
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <React.Fragment key={index}>
                    <Icon
                        className={starIcon[backgroundType].className}
                        customIcon={starIcon[backgroundType].icon  as unknown as { [key: string]: SVGElement }}
                        icon=""
                        tabIndex={0}
                    />
                </React.Fragment>
            ))}
        </Flex>
    )
}

export default StarRatingDisplay
