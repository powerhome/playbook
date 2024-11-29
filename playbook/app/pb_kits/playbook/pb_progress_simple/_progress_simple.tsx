import React from 'react'
import classnames from 'classnames'
import { buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type ModifiedGlobalProps = Omit<GlobalProps, 'width'>

type ProgressSimpleProps = {
  align?: "left" | "center" | "right",
  className?: string | string[],
  dark?: boolean,
  data?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  max?: number,
  muted: boolean,
  percent: string,
  value: number,
  variant?: "default" | "positive" | "negative" | "warning",
  width: string,
} & ModifiedGlobalProps

const ProgressSimple = (props: ProgressSimpleProps): React.ReactElement => {
  const {
    align,
    className,
    dark = false,
    data ={},
    htmlOptions = {},
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

  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const variantStyle = variant == 'default' ? '' : variant

  const valueStyles = {
    width: percent ? `${percent}%` : `${(value * 100) / max}%`,
  }

  const wrapperClass = classnames(
    buildCss('pb_progress_simple_wrapper', align, { dark: dark }),
    globalProps(props),
    className
  )

  const kitClass = classnames(
    buildCss('pb_progress_simple_kit', { muted }, variantStyle, align),
    className
  )

  return (
    <div
        {...dataProps}
        {...htmlProps}
        className={wrapperClass}
    >
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
