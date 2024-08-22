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
    const starIcon = getStarIconObject(backgroundType, colorOption, dark, size)

    const handleOnClick = (interactiveStarValue: number) => {
        setInteractiveStarValue(interactiveStarValue)
        onClick && onClick(interactiveStarValue)
    }

    return (
        <Flex className="star_flex_area">
            {[...Array(denominator)].map((_, index) => (
                <React.Fragment key={index}>
                    {index + 1 <= interactiveStarValue && (
                        <Icon
                            className={starIcon[colorOption].className}
                            cursor="pointer"
                            customIcon={starIcon[colorOption].icon  as unknown as { [key: string]: SVGElement }}
                            htmlOptions={{ onClick: () => handleOnClick(index + 1) }}
                        />
                    )}

                    {index + 1 > interactiveStarValue && (
                        <React.Fragment key={index}>
                            <Icon
                                className={starIcon[backgroundType].className}
                                cursor="pointer"
                                customIcon={starIcon[backgroundType].icon  as unknown as { [key: string]: SVGElement }}
                                htmlOptions={{ onClick: () => handleOnClick(index + 1) }}
                            />
                        </React.Fragment>
                    )}
                </React.Fragment>
            ))}
        </Flex>
    )
}

export default StarRatingInteractive
