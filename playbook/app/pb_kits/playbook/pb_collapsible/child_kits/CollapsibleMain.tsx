/* eslint-disable react/no-multi-comp */

import classnames from 'classnames'
import React, { useContext } from 'react'
import { buildCss } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps'

import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import CollapsibleContext from '../context'


type colorMap = {
  default: string,
  light: string,
  lighter: string,
  link: string,
  error: string,
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
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
  padding?: string,
  cursor?: string,

}
type IconColors =  "default" | "light" | "lighter" | "link" | "error" | "success"

type IconProps = {
  collapsed: boolean | (()=> void)
  iconColor?: IconColors
  iconSize?: string | (() => void)
}

const Icon = ({ collapsed, iconSize, iconColor }: IconProps) => {
  const direction = collapsed ? 'down' : 'up'
  const size = iconSize
  const color = colorMap[iconColor]

  return (
    <div
        className="icon_wrapper"
        key={direction}
        style={{ verticalAlign: 'middle', color: color }}
    >
      <i className={`far fa-chevron-${direction} fa-fw ${size && `fa-${size}`}`} />
    </div>
  )
}

const CollapsibleMain = ({
  children,
  className,
  cursor = 'pointer',
  padding = 'md',
  ...props
}: CollapsibleMainProps): React.ReactElement=> {
  const context: {[key: string]: IconColors | (() => void)} | boolean = useContext(CollapsibleContext)
  const mainCSS = buildCss('pb_collapsible_main_kit')
  const mainSpacing = globalProps(props, { cursor, padding })

  return (
    <div className={classnames(mainCSS, className, mainSpacing)}>
      <div onClick={context.collapse as (() => void)}>
        <Flex
            spacing="between"
            vertical="center"
        >
          <FlexItem>{children}</FlexItem>
          <FlexItem>
            <Icon
                collapsed={context.collapsed as () => void}
                iconColor={context.iconColor as IconColors}
                iconSize={context.iconSize}
            />
            </FlexItem>
        </Flex>
      </div>
    </div>
  )
}

export default CollapsibleMain
