// Prop categories
const spacingProps = ({
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  marginX,
  marginY,
  margin,
  paddingRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  paddingX,
  paddingY,
  padding,
}) => {
  let css = ''
  css += marginRight ? `mr_${marginRight} ` : ''
  css += marginLeft ? `ml_${marginLeft} ` : ''
  css += marginTop ? `mt_${marginTop} ` : ''
  css += marginBottom ? `mb_${marginBottom} ` : ''
  css += marginX ? `mx_${marginX} ` : ''
  css += marginY ? `my_${marginY} ` : ''
  css += margin ? `m_${margin} ` : ''
  css += paddingRight ? `pr_${paddingRight} ` : ''
  css += paddingLeft ? `pl_${paddingLeft} ` : ''
  css += paddingTop ? `pt_${paddingTop} ` : ''
  css += paddingBottom ? `pb_${paddingBottom} ` : ''
  css += paddingX ? `px_${paddingX} ` : ''
  css += paddingY ? `py_${paddingY} ` : ''
  css += padding ? `p_${padding} ` : ''
  return css
}

const darkProps = ({ dark }) => {
  let css = ''
  css += dark ? 'dark' : ''
  return css
}

const numberSpacingProps = ({ numberSpacing }) => {
  let css = ''
  css += numberSpacing ? `ns_${numberSpacing} ` : ''
  return css
}

const maxWidthProps = ({ maxWidth }) => {
  let css = ''
  css += maxWidth ? `max_width_${maxWidth} ` : ''
  return css
}

const zIndexProps = ({ zIndex }) => {
  let css = ''
  css += zIndex ? `z_index_${zIndex} ` : ''
  return css
}

const shadowProps = ({ shadow }) => {
  let css = ''
  css += shadow ? `shadow_${shadow} ` : ''
  return css
}

const lineHeightProps = ({ lineHeight }) => {
  let css = ''
  css += lineHeight ? `line_height_${lineHeight} ` : ''
  return css
}

const displayProps = ({ display }) => {
  let css = ''
  css += display ? `display_${display} ` : ''
  return css
}

const cursorProps = ({ cursor }) => {
  let css = ''
  css += cursor ? `cursor_${cursor} ` : ''
  return css
}

const flexDirectionProps = ({ flexDirection }) => {
  let css = ''
  css += flexDirection == 'columnReverse' ? 'flex_direction_column_reverse' :
    flexDirection == 'rowReverse' ? 'flex_direction_row_reverse' :
      flexDirection ? `flex_direction_${flexDirection} ` : ''
  return css
}

const flexWrapProps = ({ flexWrap }) => {
  let css = ''
  css += flexWrap == 'wrapReverse' ? 'flex_wrap_reverse' :
    flexWrap == 'noWrap' ? 'flex_nowrap' :
      flexWrap ? `flex_wrap_${flexWrap} ` : ''
  return css
}

const justifyContentProps = ({ justifyContent }) => {
  let css = ''
  css += justifyContent == 'spaceBetween' ? 'justify_content_space_between' :
    justifyContent == 'spaceEvenly' ? 'justify_content_space_evenly' :
      justifyContent == 'spaceAround' ? 'justify_content_space_around' :
        justifyContent ? `justify_content_${justifyContent}` : ''
  return css
}

const justifySelfProps = ({ justifySelf }) => {
  let css = ''
  css += justifySelf ? `justify_self_${justifySelf}` : ''
  return css
}

const alignItemsProps = ({ alignItems }) => {
  let css = ''
  css += alignItems ? `align_items_${alignItems}` : ''
  return css
}

const alignContentProps = ({ alignContent }) => {
  let css = ''
  css += alignContent == 'spaceBetween' ? 'align_content_space_between' :
    alignContent == 'spaceEvenly' ? 'align_content_space_evenly' :
      alignContent == 'spaceAround' ? 'align_content_space_around' :
        alignContent ? `align_content_${alignContent}` : ''
  return css
}

const alignSelfProps = ({ alignSelf }) => {
  let css = ''
  css += alignSelf ? `align_self_${alignSelf}` : ''
  return css
}

// All Exported as a single function
export const globalProps = (props, defaultProps = {}) => {
  const allProps = { ...props, ...defaultProps }
  return spacingProps(allProps) + darkProps(allProps) + maxWidthProps(allProps) + zIndexProps(allProps) + numberSpacingProps(allProps) + shadowProps(allProps) + lineHeightProps(allProps) + cursorProps(allProps) + displayProps(allProps) + flexDirectionProps(allProps) + flexWrapProps(allProps) + justifyContentProps(allProps) + justifySelfProps(allProps) + alignItemsProps(allProps) + alignContentProps(allProps) + alignSelfProps(allProps)
}

export const deprecatedProps = (kit, props = []) => {
  if (process.env.NODE_ENV === 'development') {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    props.forEach((prop) => {
      console.warn(`${kit} Kit: The prop '${prop}' is deprecated and will be removed in a future release!`)
    })
  }
}
