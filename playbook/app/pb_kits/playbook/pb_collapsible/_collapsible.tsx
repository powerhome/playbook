import React, { useEffect } from 'react'
import classnames from 'classnames'
import  useCollapsible from './useCollapsible'

import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import CollapsibleContent from './child_kits/CollapsibleContent'
import CollapsibleMain from './child_kits/CollapsibleMain'
import CollapsibleContext from './context'
import { IconSizes } from "../pb_icon/_icon"


type CollapsibleProps = {
  children?: JSX.Element | [] | any,
  aria?: {[key: string]: string},
  className?: string,
  collapsed?: boolean,
  data?: object,
  icon?: string | string[]
  iconColor?: 'default' | 'light' | 'lighter' | 'link' | 'error' | 'success',
  iconSize?: IconSizes
  id?: string,
}



const Collapsible = ({
  aria = {},
  className,
  children = [],
  collapsed = true,
  data = {},
  icon,
  iconColor = 'default',
  iconSize,
  id,
  ...props
}: CollapsibleProps) => {
  const [isCollapsed, toggle, setIsCollapsed] = useCollapsible(collapsed)

  useEffect(()=> {
   setIsCollapsed(collapsed)
  },[collapsed])

  const CollapsibleParent = React.Children.toArray(children) as JSX.Element[]

  if (CollapsibleParent.length !== 2) {
    throw new Error('Collapsible requires <CollapsibleMain> and <CollapsibleContent> to function properly.')
  }

  const Main = CollapsibleParent[0]
  const Content = CollapsibleParent[1]

  const { children: mainChildren, ...mainProps } = Main.props
  const { children: contentChildren, ...contentProps } = Content.props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_collapsible_kit'),
    globalProps(props),
    className
  )
  return (
    <CollapsibleContext.Provider value={{ collapsed: isCollapsed, toggle, icon, iconSize, iconColor }}>
      <div
          {...ariaProps}
          {...dataProps}
          className={classes}
          id={id}
      >
        <CollapsibleMain {...mainProps}>
          {mainChildren}
        </CollapsibleMain>

        <CollapsibleContent {...contentProps}>
          {contentChildren}
        </CollapsibleContent>
      </div>
    </CollapsibleContext.Provider>
  )
}

Collapsible.Main = CollapsibleMain
Collapsible.Content = CollapsibleContent

export default Collapsible
