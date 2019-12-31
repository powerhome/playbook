/* @flow */

import React from 'react'

import classnames from 'classnames'

import { Icon } from '../'
import { buildCss } from '../utilities/props'

type IconCircleProps = {
  className?: string,
  icon: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  variant?: 'default' | 'royal' | 'blue' | 'purple' | 'teal' | 'red' | 'yellow' | 'green',

}

const IconCircle = ({
  className,
  icon,
  size = 'md',
  variant = 'default',

}: IconCircleProps) => {
  const css = buildCss('pb_icon_circle_kit', size, variant)

  return (
    <div className={classnames(className, css)}>
      <Icon icon={icon} />
    </div>
  )
}

export default IconCircle
