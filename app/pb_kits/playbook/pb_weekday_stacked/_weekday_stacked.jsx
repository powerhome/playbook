/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'

import classnames from 'classnames'

type WeekdayStackedProps = {
  className?: String,
  text: String,
}

class WeekdayStacked extends React.Component<WeekdayStackedProps> {
  static defaultProps = {
    text: 'WEEKDAY STACKED'
  }

  props: WeekdayStackedProps

  render() {
    const {
      className,
      text
    } = this.props

    const css = classnames([
      `pb_weekday_stacked_kit`,
      className,
    ])

    return (
      <div className={css}>
        {text}
      </div>
    )
  }
}

export default WeekdayStacked
