import React, { useEffect, ReactElement } from 'react';
import classnames from 'classnames';
import useCollapsible from './useCollapsible';

import { globalProps } from '../utilities/globalProps';
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props';

import CollapsibleContent from './child_kits/CollapsibleContent';
import CollapsibleMain from './child_kits/CollapsibleMain';
import CollapsibleContext from './context';
import { IconSizes } from '../pb_icon/_icon';

type CollapsibleMainProps = {
  children: React.ReactNode;
  // other props for CollapsibleMain
};

type CollapsibleContentProps = {
  children: React.ReactNode;
  // other props for CollapsibleContent
};

type CollapsibleProps = {
  children: [ReactElement<CollapsibleMainProps>, ReactElement<CollapsibleContentProps>];
  aria?: { [key: string]: string };
  className?: string;
  collapsed?: boolean;
  data?: { [key: string]: string };
  icon?: string | string[];
  iconColor?: 'default' | 'light' | 'lighter' | 'link' | 'error' | 'success';
  iconSize?: IconSizes;
  onIconClick?: () => void;
  onClick?: () => void;
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
};

const Collapsible = ({
  aria = {},
  className,
  children,
  collapsed = true,
  data = {},
  htmlOptions = {},
  icon,
  iconColor = 'default',
  iconSize,
  onIconClick,
  onClick,
  id,
  ...props
}: CollapsibleProps): React.ReactElement => {
  const [isCollapsed, toggle, setIsCollapsed] = useCollapsible(collapsed);

  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  if (children.length !== 2) {
    throw new Error('Collapsible requires <CollapsibleMain> and <CollapsibleContent> to function properly.');
  }

  const [Main, Content] = children;

  const { children: mainChildren, ...mainProps } = Main.props;
  const { children: contentChildren, ...contentProps } = Content.props;
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_collapsible_kit'),
    globalProps(props),
    className
  )
  return (
    <CollapsibleContext.Provider value={{ collapsed: isCollapsed, toggle, icon, iconSize, iconColor, onIconClick, onClick }}>
      <div
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
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
