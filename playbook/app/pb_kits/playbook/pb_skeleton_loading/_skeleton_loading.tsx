
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { Sizes } from '../types'


type SkeletonLoadingProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  height?: string,
  width?: string,
  borderRadius?: string,
  gap?: Sizes | "none",
  stack?: number,
  color?: "default" | "light",
  dark?: boolean,
} & GlobalProps

const SkeletonLoading = (props: SkeletonLoadingProps): React.ReactElement => {
  const {
    aria = {},
    className,
    data = {},
    id,
    height = "16px",
    width = "100%",
    borderRadius = "sm",
    gap = "xxs",
    stack = 1,
    color = "default",
    dark = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const skeletonContainerCss =classnames(buildCss('pb_skeleton_loading'), globalProps(props), className)
  const gapClass = gap !== 'none' ? `gap_${gap}` : ''
  const innerSkeletonCss = classnames(`border_radius_${borderRadius}`,`color_${color}`, dark && 'dark', )
  const innerSizeStyle = { height, width }
  
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={skeletonContainerCss}
        id={id}
    >
      {className}
      {Array.from({ length: Number(stack) }).map((_, index) => (
        <div
            className={classnames(buildCss('pb_skeleton_loading'), innerSkeletonCss, index > 0 && gapClass)}
            key={index}
            style={innerSizeStyle}
        />
      ))}
    </div>
  )
}

export default SkeletonLoading
