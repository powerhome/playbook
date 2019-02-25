import React from "react"
import classnames from "classnames"

import spinnerStyles from "./spinner.scss"

type Props = {
   position?: 'centered',
   top?: number,
   right?: number,
   bottom?: number,
   left?: number,
   active?: boolean,
}

export default class Spinner extends React.Component<Props> {
  static defaultProps = {
    top: 90,
    right: 15,
    bottom: null,
    left: null,
    active: true,
  }
  props: Props
  render() {
    const {
      active,
      position,
      top,
      right,
      bottom,
      left
    } = this.props

    let styles
    if(!position) styles = { top: top, right: right, bottom: bottom, left: left }

    const css = classnames([
      "Spinner",
      active ? "visible" : "hidden",
      position ? spinnerStyles[position] : null,
    ])

    return (
      <div
          className={css}
          style={styles}
      >
        <span className="badge">
          <svg
              height="30px"
              id="loader-1"
              style={{ enableBackground: "new 0 0 50 50" }}
              version="1.1"
              viewBox="0 0 50 50"
              width="30px"
              x="0px"
              xmlSpace="preserve"
              y="0px"
          >
            <path
                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                fill="#004976"
                transform="rotate(70 25 25)"
            >
              <animateTransform
                  attributeName="transform"
                  attributeType="xml"
                  dur="0.6s"
                  from="0 25 25"
                  repeatCount="indefinite"
                  to="360 25 25"
                  type="rotate"
              />
            </path>
          </svg>
        </span>
      </div>
    )
  }
}