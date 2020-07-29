/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { systemProps } from '../utilities/systemProps.js'

type ProgressSimpleProps = {
  align?: "left" | "center" | "right",
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  id?: String,
  max?: String,
  muted: Boolean,
  percent: String,
  value: Number,
  variant?: "default" | "positive" | "negative",
  width: String,
}

const ProgressSimple = (props: ProgressSimpleProps) => {
  const {
    align,
    className,
    dark = false,
    max,
    muted = false,
    percent = '',
    value,
    variant = 'default',
    width = '100%',
  } = props
  const styles = {
    width: width,
  }

  const variantStyle = variant == 'default' ? '' : variant

  const valueStyles = {
    width: percent ? `${percent}%` : `${(value * 100) / max}%`,
  }

  const wrapperClass = classnames(
    className,
    buildCss('pb_progress_simple_wrapper', align, { dark: dark }),
    systemProps(props)
  )

  const kitClass = classnames(
    className,
    buildCss('pb_progress_simple_kit', { muted: muted }, variantStyle, align)
  )

  return (
    <div className={wrapperClass}>
      <div
          className={kitClass}
          data-value={value}
          style={styles}
      >
        <div
            className="progress_simple_value"
            style={valueStyles}
        />
      </div>
    </div>
  )
}

export default ProgressSimple
