import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Caption from '../pb_caption/_caption'

type NavProps = {
  aria?: { [key: string]: string },
  borderless?: boolean,
  children?: React.ReactNode[] | React.ReactNode,
  className?: string | string[],
  data?: object,
  dark?: boolean,
  highlight?: boolean,
  id?: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
  orientation?: "vertical" | "horizontal",
  link?: string,
  title?: string,
  variant?: "normal" | "subtle",
} & GlobalProps

type NavChildProps = {
  orientation: "vertical" | "horizontal";
  variant: "normal" | "subtle";
};

const Nav = (props: NavProps) => {
  const {
    aria = {},
    borderless = false,
    children,
    className,
    data = {},
    dark = false,
    highlight = true,
    id,
    link = '#',
    onClick = () => { },
    orientation = 'vertical',
    title = '',
    variant = 'normal',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const cardCss = classnames(
    buildCss('pb_nav_list', variant, orientation, {
      highlight: highlight,
      borderless: borderless,
    }),
    globalProps(props),
    className
  )

// Map over the children and clone them with orientation and variant props to gain access to them in navItem
const childrenWithProps = React.Children.map(children, (child) => {
  if (React.isValidElement(child)) {
    const childProps: NavChildProps = {
      orientation: orientation,
      variant: variant,
    };
    return React.cloneElement(child, childProps);
  }
  return child;
});

  return (
    <nav
      {...ariaProps}
      {...dataProps}
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
      <ul>{childrenWithProps}</ul>
    </nav>
  )
}

export default Nav
