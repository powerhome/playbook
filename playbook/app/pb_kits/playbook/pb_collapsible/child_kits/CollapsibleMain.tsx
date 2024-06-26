/* eslint-disable react/no-multi-comp */

import classnames from 'classnames'
import React, { useContext } from 'react'
import { buildCss } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps'

import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import { IconSizes } from "../../pb_icon/_icon"
import CollapsibleContext from '../context'
import CollapsibleIcon from './CollapsibleIcon'

type CollapsibleMainProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
  cursor?: string,
  dark?: boolean,
  onClick?: ()=> void
}
type IconColors =  "default" | "light" | "lighter" | "link" | "error" | "success"

const CollapsibleMain = ({
  children,
  className,
  cursor = 'pointer',
  ...props
}: CollapsibleMainProps): React.ReactElement=> {
  const {collapsed, toggle, icon, iconSize, iconColor, onIconClick, onClick}: any = useContext(CollapsibleContext)
  const mainCSS = buildCss('pb_collapsible_main_kit')
  const mainSpacing = globalProps(props, { cursor })

  const handleCollapsibleClick = () => {
    onClick && onClick();
    //To disable default toggling behavior return "true" in the onClick()
    const disableToggle = onClick && onClick();
    if (disableToggle !== true) {
    toggle();
    }
  }

  return (
    <div className={classnames(mainCSS, mainSpacing, className)}>
      <div onClick={handleCollapsibleClick}>
        <Flex
            spacing="between"
            vertical="center"
        >
          <FlexItem>{children}</FlexItem>
          <FlexItem>
            <CollapsibleIcon
                collapsed={collapsed as () => void}
                icon={icon as string[] | string}
                iconColor={iconColor as IconColors}
                iconSize={iconSize as IconSizes}
                onIconClick={onIconClick}
            />
            </FlexItem>
        </Flex>
      </div>
    </div>
  )
}

export default CollapsibleMain
