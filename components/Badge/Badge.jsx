/* @flow */

import React from 'react'
import classnames from 'classnames'

import styles from './styles.scss'

type Props = {
  children?: Array<React.Node>,
  style: "primary" | "default" | "success" | "danger" | "warning" | "info" | "inverse",
  className: string,
}

export default class Badge extends React.Component<Props> {
  static defaultProps = {
    children: <span>{`UR Special`}</span>,
    style: "default",
    className: "",
  }
  props: Props
  render() {
    const {
      children,
      className,
      style,
    } = this.props
    const css = [
      className,
      styles.badge,
      styles[`badge-${style}`],
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
