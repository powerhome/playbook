import React, { useState } from "react"
import { GlobalProps } from '../../utilities/globalProps'
import Icon from '../../pb_icon/_icon'
import Flex from '../../pb_flex/_flex'
import { getStarIconObject } from "../stars/utils"

type StarRatingInteractiveProps = {
    backgroundType: "fill" | "outline",
    colorOption: "yellow" | "primary" | "subtle" | "outline",
    dark: boolean,
    denominator: number,
    onClick?: (interactiveStarValue: number) => void,
    size: "xs" | "sm" | "md" | "lg",
} & GlobalProps

const StarRatingInteractive = (props: StarRatingInteractiveProps) => {
    const {
        backgroundType,
        colorOption,
        dark,
        denominator,
        onClick,
        size,
    } = props
    const [interactiveStarValue, setInteractiveStarValue] = useState(0)
    const [hoverStarValue, setHoverStarValue] = useState<number | null>(null)
    const starIcon = getStarIconObject(backgroundType, colorOption, dark, size)

    const handleOnClick = (interactiveStarValue: number) => {
        setInteractiveStarValue(interactiveStarValue)
        onClick && onClick(interactiveStarValue)
    }
    const handleMouseEnter = (value: number) => {
        setHoverStarValue(value);
    }
    const handleMouseLeave = () => {
        setHoverStarValue(null);
    }

    return (
        <Flex className="star_flex_area">
            {[...Array(denominator)].map((_, index) => {
                const starIndex = index + 1
                const isFilled = starIndex <= interactiveStarValue
                const isHovered = hoverStarValue !== null && starIndex > interactiveStarValue && starIndex <= hoverStarValue

                const baseClass = dark 
                    ? starIcon[backgroundType].className.replace('empty_star_light', 'empty_star_dark')
                    : starIcon[backgroundType].className
                
                let starClass = baseClass
                if (isFilled) {
                    starClass = starClass.replace(/(empty_star_light|empty_star_dark)/, '')
                    starClass += ` ${starIcon[colorOption].className}`
                }
                if (isHovered) {
                    starClass += ' star-hovered'
                }

                return (
                    <Icon
                        className={starClass.trim()}
                        cursor={starIndex <= interactiveStarValue ? 'default' : 'pointer'}
                        customIcon={starIcon[backgroundType].icon as unknown as { [key: string]: SVGElement }}
                        htmlOptions={{
                            onClick: () => handleOnClick(starIndex),
                            onMouseEnter: () => handleMouseEnter(starIndex),
                            onMouseLeave: () => handleMouseLeave()
                        }}
                        icon=""
                        key={index}
                        tabIndex={0}
                    />
                );
            })}
        </Flex>
    )
}

export default StarRatingInteractive
