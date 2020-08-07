import React from 'react'
import { User } from '../../'

const UserTextOnlyDark = () => {
  return (
    <div className="pb--doc-demo-row">
      <User
          align="center"
          dark
          name="Anna Black"
          orientation="horizontal"
          size="lg"
          title="Remodeling Consultant"
      />
      <User
          align="left"
          dark
          name="Anna Black"
          orientation="horizontal"
          title="Remodeling Consultant"
      />
    </div>
  )
}

export default UserTextOnlyDark
