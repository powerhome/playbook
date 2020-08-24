/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Caption, IconCircle, Title } from '../'
import { globalProps } from '../utilities/globalProps.js'

type IconStatValueProps = {
  className?: string,
  id?: string,
  unit?: string,
  value: string | number,
  icon: string,
  text: string,
  size?: "xs" | "sm" | "md" | "lg" | "xl",
  variant?: | "default"
    | "royal"
    | "blue"
    | "purple"
    | "teal"
    | "red"
    | "yellow"
    | "green",
}

const IconStatValue = (props: IconStatValueProps) => {
  const {
    className,
    id,
    unit,
    value = 0,
    icon,
    text,
    variant,
  } = props

  const displayValue = function(value) {
    if (value) {
      return (
        <Title
            className="mr-1"
            text={value}
        />
      )
    }
  }

  const displayIcon = () => {
    return (
      <IconCircle
          icon={icon}
          variant={value}
      />
    )
  }

  const statCaption = () => {
    return (
      <Caption text={text} />
    )
  }

  return (
    <div
        className={classnames('pb_icon_stat_value_kit', className, globalProps(props))}
        id={id}
    >
      <div className="">
        {displayIcon(icon, variant)}
        {displayValue(value, unit)}
        {statCaption(text)}
      </div>
    </div>
  )
}

export default IconStatValue
