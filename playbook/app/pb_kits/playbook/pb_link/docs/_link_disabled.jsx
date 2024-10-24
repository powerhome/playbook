import React from 'react'
import { Link } from 'playbook-ui'

const LinkDisabled = (props) => (
  <div>
    <Link
        disabled
        href="https://www.google.com/"
        text="link example"
        {...props}
    />
  </div>
)

export default LinkDisabled
