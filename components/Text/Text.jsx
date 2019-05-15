/* @flow */

import React from 'react'
import classnames from 'classnames'

import styles from './styles.scss'


type Props = {
  children?: Array<React.Node>,
  color: "sky-lighter" | "sky-light" | "sky" | "sky-dark" | "ink-lightest" | "ink-lighter" | "ink-light"| "ink" | "ink-dark",
  size: "base" | "large" | "larger" | "largest" | "small" | "smaller" | "smallest",
  bold: boolean,
  italic: boolean,
  className: string,
}

export default class Text extends React.Component<Props> {
  static defaultProps = {
    children: <span/>,
    size: "base",
    color: "ink",
    bold: false,
    italic: false,
    className: "",
  }
  props: Props
  render() {
    const {
      children,
      className,
      bold,
      italic,
      size,
      color,
    } = this.props
    const css = [
      className,
      styles.badge,
      styles[`text-${color}`],
      styles[`text-${size}`],
      bold ? styles["font-weight-bold"] : null,
      italic ? styles["font-italic"] : null,
    ]
    return (
      <span
          className={classnames(css)}
      >
        {children}
      </span>
    )
  }
}
