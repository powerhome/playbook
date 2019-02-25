/* @flow */

import React from 'react'
import classnames from 'classnames'
import { IconType } from "../types"

type Props = {
  className: string,
  disabled: boolean,
  icon: IconType,
  onClick: () => mixed,
  text: string,
  type: "anchor" | "button" | "submit" | "",
}

export default class Button extends React.Component<Props> {
  static defaultProps = {
    text: "button",
  }
  props: Props
  createElementTag = () => {
    const {
      className,
      disabled,
      icon,
      onClick,
      text,
      type
    } = this.props
    let tag
    let props = {}
    switch(type) {
      case "anchor":
        tag = "a"
      break
      case "button":
        tag = "input"
        props.type = "button"
        props.value = text
      break
      case "submit":
        tag = "input"
        props.type = "submit"
        props.value = text
      break
      default:
        tag = "span"
      break
    }
    const css = [
      "btn",
      className,

    ]
    props.onClick = onClick
    props.className = classnames(css)
    if(disabled) props.disabled = true

    const element = React.createElement(tag, props)

    if(tag === "input") {
      return <element.type {...element.props} />
    } else {
      return (
        <element.type {...element.props}>
          <If condition={icon}>{icon}</If>
          {text}
        </element.type>
      )
    }
  }
  render() {
    return this.createElementTag()
  }
}
