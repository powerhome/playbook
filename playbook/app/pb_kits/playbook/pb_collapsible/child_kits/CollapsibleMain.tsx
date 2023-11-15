/* eslint-disable react/no-multi-comp */

import classnames from "classnames"
import React, { useContext } from "react"
import { buildCss } from "../../utilities/props"
import { globalProps } from "../../utilities/globalProps"

import Flex from "../../pb_flex/_flex"
import FlexItem from "../../pb_flex/_flex_item"
import Icon, { IconSizes } from "../../pb_icon/_icon"
import CollapsibleContext from "../context"

type colorMap = {
  default: string
  light: string
  lighter: string
  link: string
  error: string
  success: string
}

const colorMap = {
  default: "#242B42",
  light: "#687887",
  lighter: "#C1CDD6",
  link: "#0056CF",
  error: "#FF2229",
  success: "#00CA74",
}

type CollapsibleMainProps = {
  children: React.ReactNode[] | React.ReactNode
  className?: string
  cursor?: string
  dark?: boolean
  onClick?: () => void
}
type IconColors = "default" | "light" | "lighter" | "link" | "error" | "success"

type IconProps = {
  collapsed: boolean | (() => void)
  icon?: string[] | string
  iconColor?: IconColors
  iconSize?: IconSizes
  onIconClick?: () => void
}

const ToggleIcon = ({
  collapsed,
  icon,
  iconSize,
  iconColor,
  onIconClick,
}: IconProps) => {
  const color = colorMap[iconColor]

  const showIcon = (icon: string | string[]) => {
    if (typeof icon === "string") {
      return [icon, icon]
    }
    return icon
  }

  const handleIconClick = (e: any) => {
    if (onIconClick) {
      e.stopPropagation()
      onIconClick()
    }
  }

  return (
    <>
      {collapsed ? (
        <div
          className="icon_wrapper"
          key={icon ? showIcon(icon)[0] : "chevron-down"}
          style={{ verticalAlign: "middle", color: color }}
          onClick={e => handleIconClick(e)}
        >
          <Icon
            icon={icon ? showIcon(icon)[0] : "chevron-down"}
            size={iconSize}
          />
        </div>
      ) : (
        <div
          className="icon_wrapper"
          key={icon ? showIcon(icon)[1] : "chevron-up"}
          style={{ verticalAlign: "middle", color: color }}
          onClick={e => handleIconClick(e)}
        >
          <Icon
            icon={icon ? showIcon(icon)[1] : "chevron-up"}
            size={iconSize}
          />
        </div>
      )}
    </>
  )
}

const CollapsibleMain = ({
  children,
  className,
  cursor = "pointer",
  ...props
}: CollapsibleMainProps): React.ReactElement => {
  const {
    collapsed,
    toggle,
    icon,
    iconSize,
    iconColor,
    onIconClick,
    onClick,
  }: any = useContext(CollapsibleContext)
  const mainCSS = buildCss("pb_collapsible_main_kit")
  const mainSpacing = globalProps(props, { cursor })

  const handleCollapsibleClick = () => {
    onClick && onClick()
    //To disable default toggling behavior return "true" in the onClick()
    const disableToggle = onClick && onClick()
    if (disableToggle !== true) {
      toggle()
    }
  }

  return (
    <div className={classnames(mainCSS, mainSpacing, className)}>
      <div onClick={handleCollapsibleClick}>
        <Flex spacing="between" vertical="center">
          <FlexItem>{children}</FlexItem>
          <FlexItem>
            <ToggleIcon
              collapsed={collapsed as () => void}
              iconColor={iconColor as IconColors}
              iconSize={iconSize as IconSizes}
              icon={icon as string[] | string}
              onIconClick={onIconClick}
            />
          </FlexItem>
        </Flex>
      </div>
    </div>
  )
}

export default CollapsibleMain
