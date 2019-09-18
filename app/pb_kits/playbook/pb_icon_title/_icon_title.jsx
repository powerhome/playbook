/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

import classnames from 'classnames'

type IconTitleProps = {
  className?: String,
  column?: Boolean,
  dark?: Boolean,
  value: String,
  description?: String,
  icon?: String,
  icon_variant?: String,
  size?: String,
}

class IconTitle extends React.Component<IconTitleProps> {
  static defaultProps = {
    value: "584kW",
    column: false,
    dark: false,
    description: "Energy Consumption",
    icon: "lightbulb",
    icon_variant: "red",

  }

  props: IconTitleProps

  render() {
    const {
      className,
      value,
      column,
      dark,
      description,
      icon,
      icon_variant,
    } = this.props

    const css = classnames([
      `pb_icon_title_kit`,
      className,
      dark,
      column

    ])

    return (
      <div className={css}>
        {value}
      </div>
    )
  }
}

export default IconTitle
