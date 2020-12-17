/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildCss } from '../utilities/props'
import { Body, Icon } from '../'
import { globalProps } from '../utilities/globalProps.js'

const statusMap = {
  increase: 'positive',
  decrease: 'negative',
}

const iconMap = {
  increase: 'arrow-up',
  decrease: 'arrow-down',
}

type StatChangeProps = {
  change?: "increase" | "decrease" | "neutral",
  className?: string,
  icon?: string,
  id?: string,
  value?: string | number,
}

const StatChange = (props: StatChangeProps) => {
  const { change = 'neutral', className, icon, id, value } = props
  const status = statusMap[change] || 'neutral'
  let returnedIcon = iconMap[change]
  if (icon) {
    returnedIcon = icon
  }

  return (
    <If condition={value}>
      <div
          className={classnames(
          buildCss('pb_stat_change_kit', status),
          globalProps(props),
          className
        )}
          id={id}
      >
        <Body status={status}>
          <If condition={returnedIcon}>
            <Icon
                fixed_width
                icon={returnedIcon}
            />
            {' '}
          </If>
          {`${value}%`}
        </Body>
      </div>
    </If>
  )
}

export default StatChange
