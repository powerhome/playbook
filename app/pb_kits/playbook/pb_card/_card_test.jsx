/* @flow */

import React from 'react'
import { Card } from '../'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'

type CardProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  headerPadding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  bodyPadding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
}

const Header = () => null
const Body = () => null
class CardTest extends React.Component<Props> {
  static defaultProps = {
    children: null,
    className: null,
    headerPadding: 'sm',
    headerColor: 'royal',
    bodyPadding: 'sm',
  }
  props: CardProps
  renderHeader() {
    const { children } = this.props
    const header = React.Children.map(children, child => {
      if (child.type.displayName === 'Header' || child.type.name === 'Header') {
        return React.cloneElement(child)
      }
    })
    return (
      header.length > 0 ? header[0].props.children : ''
    )
  }
  renderBody() {
    const { children } = this.props;
    const body = React.Children.map(children, child => {
      if (child.type.displayName === 'Body' || child.type.name === 'Body') {
        return React.cloneElement(child)
      }
    })
    return (
      <div className="pb_card_body_kit">{body.length > 0 ? body[0].props.children : '' }</div>
    )
  }
  render() {
    const {
      className,
      headerPadding,
      headerColor,
      bodyPadding,
    } = this.props
    const headerCSS = buildCss('pb_card_header_kit', headerPadding, headerColor)
    const bodyCSS = buildCss('pb_card_body_kit', bodyPadding)
    return (
      <Card padding="none">
        <div className={classnames(headerCSS, className)}>
          {this.renderHeader()}
        </div>
        <div className={classnames(bodyCSS, className)}>
          {this.renderBody()}
        </div>
      </Card>
    )
  }
}

CardTest.Header = Header
CardTest.Body = Body

export default CardTest
