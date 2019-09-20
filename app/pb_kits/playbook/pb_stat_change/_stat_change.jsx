/* @flow */

import React from 'react'
import classnames from 'classnames'
import Body from '../pb_body/_body.jsx'
import Icon from '../pb_icon/_icon.jsx'

type StatChangeProps = {
  change?: 'increase' | 'decrease' | 'neutral',
  className?: String,
  id?: String,
  value?: String | Number
}

const statChangeCSS = ({}: StatChangeProps, status) => {

  const statusStyle = status !== '' ? `_${status}` : ''

  return 'pb_stat_change_kit' + statusStyle
}

const StatChange = (props: StatChangeProps) => {
  const {
    change='neutral',
    className,
    id,
    value,
  } = props

  const status = (function(change) {
    switch(change) {
      case 'increase':
        return 'positive';
      case 'decrease':
        return 'negative';
      default:
        return 'neutral';
    }
  })(change)

  const icon = (function(change) {
    switch(change) {
      case 'increase':
        return 'arrow-up';
      case 'decrease':
        return 'arrow-down';
      default:
        return null;
    }
  })(change)

  const displayIcon = function(icon) {
    if (icon) {
      return (
        <span>
          <Icon icon={icon} fixed_width={true} />
          &nbsp;
        </span>
      )
    }
  }

  const displayValue = function(status, value) {
    if (value) {
      return (
        <Body status={status}>
          {displayIcon(icon)}
          {value}
        </Body>
      )
    }
  }

  return (
    <div id={id} className={classnames(statChangeCSS(props, status), className)}>
      {displayValue(status, value)}
    </div>
  )
}

export default StatChange
