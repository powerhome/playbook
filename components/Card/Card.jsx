import React from 'react'
import classnames from 'classnames'


export type CardProps = {
  children: string | React.Node | Array<React.Node>,
  shadow?: Boolean,
  shadowShallow?: Boolean,
  shadowDeep?: Boolean,
  shadowDeeper?: Boolean,
  shadowDeepest?: Boolean,
}

export default class Card extends React.Component<Props> {
  static defaultProps = {
    children: null,
    shadow: false,
    shadowShallow: false,
    shadowDeep: false,
    shadowDeeper: false,
    shadowDeepest: false,
  }
  props: Props
  render() {
    const {
      children,
      className,
      shadow,
      shadowShallow,
      shadowDeep,
      shadowDeeper,
      shadowDeepest,
    } = this.props
    const css = classnames([
      "card",
      className,
    ])
    return (
      <div className={css}>
        { children }
      </div>
    )
  }
}
