
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
    stack = "1",
    color = "default",
    dark = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  // const classes = classnames(buildCss('pb_skeleton_loading'), globalProps(props), className)
  // let css = classnames(globalProps(props, { borderRadius }), className)
  // const skeletonContainerCss = classnames('pb_skeleton_loading', globalProps(props), className)
  const skeletonContainerCss =classnames(buildCss('pb_skeleton_loading'), globalProps(props), className)
  const gapClass = gap !== 'none' ? `gap_${gap}` : ''
  const innerSkeletonCss = classnames(`border_radius_${borderRadius}`,`color_${color}`, dark && 'dark', )
  const innerSizeStyle = { height, width }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        // className={classes}
        // className={css}
        className={skeletonContainerCss}
        id={id}
        // style={sizeStyle}
        style={{ display: "flex", flexDirection: "column" }}
    >
      {className}
      {/* {"hello skeleton_loading tsx file"} */}
      {/* <div style={{height: "16px", width: "100%", backgroundColor: "red"}}> </div> */}
      {/* <div style={{height, width, }}> </div> */}
      {Array.from({ length: Number(stack) }).map((_, index) => (
        <div
            // className={gap !== 'none' ? gapClass : ''}
            // className={index > 0 && stack > 1 && gap !== 'none' ? `gap_${gap}` : ''}
            // className={classnames(`color_${color}`, `border_radius_${borderRadius}`, dark && 'dark', index > 0 && gapClass)}
            className={classnames(innerSkeletonCss, index > 0 && gapClass)}
            // className={classnames((gapClass && index > 0), innerSkeletonCss)}
            // className={classnames({ [gapClass]: index > 0, innerSkeletonCss })}
            key={index}
            // style={sizeStyle}
            style={innerSizeStyle}
        />
      ))}
      {/* {Array.from({ length: Number(stack) }).map((_, index) => {
        const classNames = classnames(
          innerSkeletonCss,
          { [gapClass]: index > 0 }
        )

        return (
          <div
            key={index}
            style={innerSizeStyle}
            className={classNames}
          />
        )
      })} */}
    </div>
  )
}

export default SkeletonLoading
