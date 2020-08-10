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
  id?: string,
  value?: string | number,
}

const StatChange = (props: StatChangeProps) => {
  const { change = 'neutral', className, id, value } = props
  const status = statusMap[change] || 'neutral'
  const icon = iconMap[change]

  return (
    <If condition={value}>
      <div
          className={classnames(
          className,
          buildCss('pb_stat_change_kit', status),
          globalProps(props)
        )}
          id={id}
      >
        <Body status={status}>
          <If condition={icon}>
            <Icon
                fixed_width
                icon={icon}
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
