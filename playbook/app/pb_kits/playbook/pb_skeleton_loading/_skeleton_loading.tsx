
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
// import { Sizes } from '../types'


type SkeletonLoadingProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  // height?: string,
  // width?: string,
  // borderRadius: string,
  // gap?: Sizes | "none",
  // stack?: number,
  // color?: "default" | "light",
}

const SkeletonLoading = (props: SkeletonLoadingProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    // height = "16px",
    // width = "100%",
    // borderRadius = "sm",
    // gap = "xxs",
    // stack = "1",
    // color = "default",
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_skeleton_loading'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {className}
      {"hello skeleton_loading tsx file"}
    </div>
  )
}

export default SkeletonLoading
