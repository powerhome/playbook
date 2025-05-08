import React from 'react'
import User from '../../pb_user/_user'

const UserGrayscale = (props) => {
  return (
    <User
        avatarUrl="https://randomuser.me/api/portraits/women/44.jpg"
        grayscale
        name="Anna Black"
        title="Remodeling Consultant"
        {...props}
    />
  )
}

export default UserGrayscale
