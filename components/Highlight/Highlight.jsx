/* @flow */
import styles from './styles.scss'
import React from 'react'
import classnames from 'classnames'

type Props = {

  side: "top" | "bottom" | "left" | "right"| null,
  color: "power-navy" | "power-navy-darker" | "power-red" | "power-gold" | "power-blue" | "power-green" | "power-royal",

}

export default class Highlight extends React.Component<Props> {
  static defaultProps = {
    side: "",
    color: "",
  }
  props: Props
  render() {
    const {
      side,
      color,
    } = this.props

    const css = [
      styles[`highlight-${side}`],
      styles[`highlight-${color}`],
    ]

    return (
      <div>
        <span className={classnames(css,'well')} >{`I'm a ${side} highlight ${color}`}</span>
      </div>



    )
  }
}
