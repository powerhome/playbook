import React from 'react'
import { Link } from 'playbook-ui'

const LinkUnderline = (props) => (
  <div>
    <Link
        href="#underline"
        text="link example"
        underlined
        {...props}
    />
  </div>
)

export default LinkUnderline
