import React from 'react'

// Event handlers are not CSS-class global props. Keep them off GlobalProps so
// kits with kit-specific onClick signatures (e.g. StarRating) do not conflict.
export type GlobalEventProps = {
  onClick?: React.MouseEventHandler<HTMLElement>,
}

export const globalEventProps = (
  props: GlobalEventProps
): Pick<GlobalEventProps, 'onClick'> => {
  return props.onClick ? { onClick: props.onClick } : {}
}
