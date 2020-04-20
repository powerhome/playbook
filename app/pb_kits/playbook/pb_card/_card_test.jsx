/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'

// Card props
type CardProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  highlight?: {
    position?: 'side' | 'top',
    color?: String
  },
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  selected?: Boolean,
  shadow?: 'none' | 'shallow' | 'default' | 'deep' | 'deeper' | 'deepest',
  dark?: Boolean,

}

// Card header props
type CardHeaderProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  color?: 'category_1' | 'category_2' | 'category_3' | 'category_4' | 'category_5' | 'category_6' | 'category_7' | 'category_8' |
          'category_9' | 'category_10' | 'category_11' | 'category_12' | 'category_13' | 'category_14' | 'category_15' | 'category_16' |
          'category_17' | 'category_18' | 'category_19' | 'category_20' | 'category_21',
}

// Card body props
type CardBodyProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
}

// Header component
const Header = ({
  children,
  className,
  padding = "sm",
  color = "category_14"
}: CardHeaderProps) => {
  const headerCSS = buildCss('pb_card_header_kit', padding, color)
  return (
    <div className={classnames(headerCSS, className)}>
      {children}
    </div>
  )
}

// Body component
const Body = ({
  children,
  className,
  padding = "sm",
}: CardBodyProps) => {
  const bodyCSS = buildCss('pb_card_body_kit', padding)
  return (
    <div className={classnames(bodyCSS, className)}>
      {children}
    </div>
  )
}
class CardTest extends React.Component<Props> {
  static defaultProps = {
    children: null,
    className: null,
  }
  props:CardProps

  renderHeader(children) {
    return children.filter(c => {
      debugger
      return c.type.displayName === 'Header' || c.type.name === 'Header'
    }).map((child, i) => {
      return React.cloneElement(child, {key: `header-${i}`})
    })
  }

  renderBody(children) {
    return children.filter(c => {
      return c.type.displayName === 'Body' || c.type.name === 'Body'
    }).map((child, i) => {
      return React.cloneElement(child, {key: `body-${i}`})
    })

  }
  render() {
    const {
      children,
      className,
      dark = false,
      highlight = {},
      padding = 'md',
      selected = false,
      shadow = 'none',
    } = this.props
    const bodyCss = buildCss('pb_card_body_kit', padding)
    const cardCss = buildCss('pb_card_kit', `shadow_${shadow}`, {
      'dark': dark,
      selected,
      deselected: !selected,
      [`highlight_${highlight.position}`]: highlight.position,
      [`highlight_${highlight.color}`]: highlight.color,
    })
    return (
      <div className={classnames(cardCss, className)}>
        <div className={bodyCss}>
          {this.renderHeader(children)}
          {this.renderBody(children)}
        </div>
      </div>
    )
  }
}

CardTest.Header = Header
CardTest.Body = Body

export default CardTest


    /*
    const { 
      children,
      className,
      headerPadding = "md",
      headerColor = "royal"
    } = this.prop
    
    const headerCSS = buildCss('pb_card_header_kit', headerPadding, headerColor)

    const header = React.Children.map(children, child => {
      if (child.type.displayName === 'Header' || child.type.name === 'Header') {
        return  (
          <div className={classnames(headerCSS, className)}>
            {React.cloneElement(child)}
          </div>
        )
      }
    })
    return (
      header.length > 0 ? header[0].props.children : ''
    )*/

        // const { children } = this.props;
    // const body = React.Children.map(children, child => {
    //   if (child.type.displayName === 'Body' || child.type.name === 'Body') {
    //     return React.cloneElement(child)
    //   }
    // })
    // return (
    //   body.length > 0 ? body[0].props.children : '' 
    // )

            {/* <div className={classnames(bodyCSS, className)}>
          {this.renderBody()}
        </div> */}
        