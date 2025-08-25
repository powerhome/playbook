import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import { GlobalProps, globalProps, globalInlineProps } from '../utilities/globalProps'

import { Round, RoundLabel } from "./subcomponents/_round";
import Game from "./subcomponents/_game";
import Participant from "./subcomponents/_participant";

type LayoutPropTypes = {
  aria?: {[key: string]: string},
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  collapse?: "xs" | "sm" | "md" | "lg" | "xl",
  dark?: boolean,
  data?: Record<string, unknown>,
  full?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  position?: "left" | "right",
  responsive?: boolean,
  size?: "xs" | "sm" | "md" | "base" | "lg" | "xl",
  variant?: "light" | "dark" | "gradient",
  transparent?: boolean,
  layout?: "sidebar" | "collection" | "collection_detail" | "kanban" | "content" | "masonry" | "bracket",
} & GlobalProps

type LayoutSideProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
} & GlobalProps

type LayoutBodyProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
} & GlobalProps

type LayoutItemProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
  size?: "sm" | "md" | "lg"
} & GlobalProps

type LayoutHeaderProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
} & GlobalProps

type LayoutFooterProps = {
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
} & GlobalProps

const Side = (props: LayoutSideProps) => {
  const { children, className } = props
  const dynamicInlineProps = globalInlineProps(props)
  return (
    <div
        className={classnames('layout_sidebar', globalProps(props), className)}
        style={dynamicInlineProps}
    >
      {children}
    </div>
  )
}

// Body component
const Body = (props: LayoutBodyProps) => {
  const { children, className } = props
  const dynamicInlineProps = globalInlineProps(props)
  return (
    <div
        className={classnames('layout_body', globalProps(props), className)}
        style={dynamicInlineProps}
    >
      {children}
    </div>
  )
}

// Item component
const Item = (props: LayoutItemProps) => {
  const { children, className, size = 'sm' } = props
  const dynamicInlineProps = globalInlineProps(props)
  return (
    <div
        className={classnames('layout_item', `layout_item_size_${size}`, globalProps(props), className)}
        style={dynamicInlineProps}
    >
      {children}
    </div>
  )
}

// Header component
const Header = (props: LayoutHeaderProps) => {
  const { children, className } = props
  const dynamicInlineProps = globalInlineProps(props)
  return (
    <div
        className={classnames('layout_header', globalProps(props), className)}
        style={dynamicInlineProps}
    >
      {children}
    </div>
  )
}

// Footer component
const Footer = (props: LayoutFooterProps) => {
  const { children, className } = props
  const dynamicInlineProps = globalInlineProps(props)
  return (
    <div
        className={classnames('layout_footer', globalProps(props), className)}
        style={dynamicInlineProps}
    >
      {children}
    </div>
  )
}

const Layout = (props: LayoutPropTypes) => {
  const {
    aria = {},
    children,
    className,
    collapse = 'md',
    dark = false,
    data = {},
    full = false,
    htmlOptions = {},
    position = 'left',
    responsive = false,
    size = 'md',
    layout = 'sidebar',
    variant = 'light',
    transparent = false,
  } = props
  const responsiveClass = responsive ? '_responsive' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const layoutCss =
    (layout == 'collection' || layout == 'bracket' || layout == 'collection_detail' || layout == 'content' || layout == 'masonry')
      ? `pb_layout_kit_${layout}`
      : layout == 'kanban'
        ? `pb_layout_kit_${layout}${responsiveClass}`
        : classnames(
            'pb_layout_kit_sidebar',
            `pb_layout_kit_sidebar_size_${size}_${position}_${variant}`,
            {
              'pb_layout_kit_sidebar_dark': dark,
              'pb_layout_kit_sidebar_transparent': transparent,
              'pb_layout_kit_sidebar_full': full,
            }
          )

  const layoutCollapseCss =
    (layout == 'collection' || layout == 'collection_detail' || layout == 'content' || layout == 'masonry' || layout == 'kanban' || layout == 'bracket')
      ? ''
      : `layout_${position}_collapse_${collapse}`

  const layoutChildren = React.Children.toArray(children)

  const subComponentTags = (tagName: string) => {
    return layoutChildren
      .filter((c: React.ReactElement & {type: {displayName: string}}) => {
        return c.type?.displayName === tagName
      })
      .map((child, i) => {
        return React.cloneElement(child as React.ReactElement, {
          key: `${tagName.toLowerCase()}-${i}`,
        })
      })
  }

  const nonSideChildren = layoutChildren.filter(
    (child: React.ReactElement & {type: {displayName: string}}) => child.type?.displayName !== 'Side'
  )

  const numberOfRounds = Array.isArray(children) ? React.Children.toArray(children).filter(
    (child) => {
      return (child as React.ReactElement).type === Layout.Round;
    }
  ).length : 0

  const lastRoundWithSelf = React.Children.toArray(children).filter((child) => {
    if ((child as React.ReactElement).type !== Layout.Round) {
      return false
    }
  
    const roundElement = child as React.ReactElement
  
    const gameChildren = React.Children.toArray(roundElement.props.children)
  
    const hasWinningSelfParticipant = gameChildren.some((gameChild) => {
      const gameElement = gameChild as React.ReactElement
  
      const participantChildren = React.Children.toArray(gameElement.props.children)
  
      return participantChildren.some((participantChild) => {
        const participantElement = participantChild as React.ReactElement
        const { self } = participantElement.props
        return self === true
      })
    })
  
    return hasWinningSelfParticipant
  }).length

  const bracketChildren = nonSideChildren.map(child =>
    React.isValidElement(child) ? React.cloneElement(child, { numberOfRounds, lastRoundWithSelf }) : child
  )
  
  const filteredProps = {...props}
  delete filteredProps?.position

  const dynamicInlineProps = globalInlineProps(props)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classnames(
        layoutCss,
        layoutCollapseCss,
        className,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        globalProps(filteredProps)
        )}
        style={dynamicInlineProps}
    >
      {subComponentTags('Side')}
      {layout === 'bracket' ? bracketChildren : nonSideChildren}
    </div>
  )
}

Layout.Side = Side
Layout.Body = Body
Layout.Item = Item
Layout.Header = Header
Layout.Footer = Footer
Layout.Round = Round
Layout.Game = Game
Layout.RoundLabel = RoundLabel
Layout.Participant = Participant

export default Layout
