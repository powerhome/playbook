
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type FullScreenProps = {
  aria?: { [key: string]: string },
  children?: React.ReactNode,
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) | ((event: any) => void) | any },
  id?: string,
} & GlobalProps

const FullScreen = (props: FullScreenProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_full_screen_kit'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {children}
    </div>
  )
}

export default FullScreen
