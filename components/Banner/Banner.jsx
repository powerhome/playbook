/* @flow */

import React from "react"
import classnames from "classnames"

import styles from "./styles.scss"

export type BannerProps = {
  closeable?: boolean,
  children: string | React.Node | Array<React.Node>,
  onClose: () => void,
  position: "top" | "bottom",
  show?: boolean,
  style: "info" | "success" | "warning" | "danger",
}

const Banner = ({
  closeable,
  children,
  onClose,
  position,
  show,
  style,
}: BannerProps) => {
  const css = classnames([
    styles[`banner-${style}`],
    styles[show ? `show-${position}` : `hide-${position}`],
  ])
  return (
    <div className={css}>

      { children }

      <If condition={closeable}>
        <button
            className={classnames(styles.close, "close")}
            onClick={onClose}
        >
          {`×`}
        </button>
      </If>

    </div>
  )
}

Banner.defaultProps = {
  closeable: true,
  position: "top",
  show: false,
  style: "info",
}

export default Banner
