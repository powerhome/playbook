/* @flow */

import React from 'react'
import classNames from 'classnames'

import styles from './flyout_panel.scss'

type FlyoutPanelProps = {|
  className: ?string,
  position: "left" | "right",
  show: ?boolean,
  children: string,
|}

const FlyoutPanel = ({ position, show, children, className }: FlyoutPanelProps) => {
  const positionClass = position == "right" ? styles.right : styles.left
  const classes = classNames(
    styles['flyout-panel'],
    positionClass,
    className,
    "col-md-5",
    show ? styles.open : null
  )
  const scrollClasses = classNames(styles['scroll-inner-box'], 'p-5', 'pt-2')
  return (
    <div className={classes}>
      <div className={scrollClasses}>
        {children}
      </div>
    </div>
  )
}

export default FlyoutPanel