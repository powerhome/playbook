import React from 'react'
import { Link } from 'playbook-ui'

const LinkDefault = (props) => (
  <div>
    <Link
        href="https://www.google.com/"
        text="link example"
        {...props}
    />
  </div>
)

export default LinkDefault
