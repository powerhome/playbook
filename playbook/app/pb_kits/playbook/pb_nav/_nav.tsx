import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Caption from '../pb_caption/_caption'
import { SpacingObject, NavChildProps } from './navTypes'

type NavProps = {
  aria?: { [key: string]: string },
  borderless?: boolean,
  children?: React.ReactNode[] | React.ReactNode,
  className?: string | string[],
  data?: Record<string, unknown>,
  dark?: boolean,
  extendedUnderline?: boolean,
  highlight?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  onClick?: () => void,
  orientation?: "vertical" | "horizontal",
  link?: string,
  title?: string,
  variant?: "normal" | "subtle",
  itemSpacing?: SpacingObject
} & GlobalProps

const Nav = (props: NavProps): React.ReactElement => {
  const {
    aria = {},
    borderless = false,
    children,
    className,
    data = {},
    dark = false,
    extendedUnderline = false,
    highlight = true,
    htmlOptions = {},
    id,
    link = '#',
    onClick,
    orientation = 'vertical',
    title = '',
    variant = 'normal',
    itemSpacing,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const cardCss = classnames(
    buildCss('pb_nav_list', variant, orientation, {
      highlight: highlight,
      borderless: borderless,
    }),
    // extended underline is only applicable for horizontal normal nav, should not 
    // affect other variants or orientations
    variant === 'normal' && orientation === 'horizontal' && extendedUnderline && 'pb_nav_extended_underline',
    globalProps(props),
    className
  )

// Map over the children and clone them with orientation, variant and itemSpacing props to gain access to them in navItem
const childrenWithProps = React.Children.map(children, (child) => {
  if (React.isValidElement(child)) {
    const childProps: NavChildProps = {
      orientation: orientation,
      variant: variant,
      itemSpacing: itemSpacing
    };
    return React.cloneElement(child, childProps);
  }
  return child;
});

  return (
    <nav
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={cardCss}
        id={id}
    >
      {title &&
        <div className="pb_nav_list_title">
          <a
              className="pb_nav_list_item_link_text"
              href={link}
              onClick={onClick}
          >
            <Caption
                dark={dark}
                size="md"
                text={`${title}`}
            />
          </a>
        </div>
      }
      <div className='pb_nav_wrapper'>{childrenWithProps}</div>
    </nav>
  )
}

export default Nav
