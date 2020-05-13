/* @flow */

import React from 'react'

type SelectableIconProps = {
  border?: Boolean,
  className?: String,
  data?: String,
  flip?: String,
  icon?: String,
  id?: String,
  rotation?: String,
  size?: String,
  tabindex?: String,
}

const SelectableIcon = ({
  border,
  className,
  data,
  flip,
  icon,
  id,
  rotation,
  size,
  tabindex,
}: SelectableIconProps) => (
  <div>
    <p>{`border: ${border}`}</p>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`flip: ${flip}`}</p>
    <p>{`icon: ${icon}`}</p>
    <p>{`id: ${id}`}</p>
    <p>{`rotation: ${rotation}`}</p>
    <p>{`size: ${size}`}</p>
    <p>{`tabindex: ${tabindex}`}</p>
  </div>
)

export default SelectableIcon
