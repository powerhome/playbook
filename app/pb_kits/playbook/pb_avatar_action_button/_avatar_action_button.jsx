/* @flow */

import React from 'react'

type AvatarActionButtonProps = {
  className?: String,
  data?: String,
  icon?: String,
  id?: String,
  imageUrl?: String,
  name?: String,
  placement?: String,
  size?: String,
  tooltipText?: String,
}

const AvatarActionButton = ({
  className,
  data,
  icon,
  id,
  imageUrl,
  name,
  placement,
  size,
  tooltipText,
}: AvatarActionButtonProps) => (
  <div>
    <p>{`className: ${className}`}</p>
    <p>{`data: ${data}`}</p>
    <p>{`icon: ${icon}`}</p>
    <p>{`id: ${id}`}</p>
    <p>{`imageUrl: ${imageUrl}`}</p>
    <p>{`name: ${name}`}</p>
    <p>{`placement: ${placement}`}</p>
    <p>{`size: ${size}`}</p>
    <p>{`tooltipText: ${tooltipText}`}</p>
  </div>
)

export default AvatarActionButton
