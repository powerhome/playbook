import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

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
  padding?: string,
}

export const useCollapsible = (initial= false) => {
  const [collapsed, setCollapsed] = useState(initial)
  useEffect(()=> {
     console.log("inside hook",collapsed)
      },[collapsed])

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }
    
  return [
    collapsed,
    toggleCollapse,
  ]
}

const Collapsible = ({
  aria = {},
  className,
  children = [],
  collapsed = false,
  data = {},
  icon,
  iconColor = 'default',
  iconSize,
  id,
  padding = 'md',
  ...props
}: CollapsibleProps) => {
  // console.log(collapsed)
  const [isCollapsed, collapse] = useCollapsible(collapsed)
  // const [initialCollapsed, setInitialCollapsed] = useState(true); // New state for initial collapsed state
  // const [isCollapsed, collapse] = useCollapsible(initialCollapsed); // Using initialCollapsed in the hook

  useEffect(() => {
    collapse(!isCollapsed) // Set the initialCollapsed state based on the collapsed prop
  }, [collapsed]);
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
    globalProps(props, { padding }),
    className
  )
  // console.log(collapsed)
  // console.log('internal component:', isCollapsed)
  return (
    <CollapsibleContext.Provider value={{ collapsed: isCollapsed, collapse, icon, iconSize, iconColor }}>
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
