import React from 'react'
import Avatar from '../../pb_avatar/_avatar'

const AvatarGrayscale = (props) => {
  return (
    <Avatar
        grayscale
        imageAlt="Terry Johnson Standing"
        imageUrl="https://randomuser.me/api/portraits/men/44.jpg"
        name="Terry Johnson"
        {...props}
    />
  )
}

export default AvatarGrayscale
