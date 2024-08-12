import React from 'react'
import { User } from 'playbook-ui'

const UserTextOnly = (props) => {
  return (
    <div className="pb--doc-demo-row">
      <User
          align="center"
          name="Anna Black"
          orientation="horizontal"
          size="lg"
          title="Remodeling Consultant"
          {...props}
      />
      <User
          align="left"
          name="Anna Black"
          orientation="horizontal"
          title="Remodeling Consultant"
          {...props}
      />
    </div>
  )
}

export default UserTextOnly
