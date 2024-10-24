import React from 'react'
import { Link } from 'playbook-ui'

const LinkTag = (props) => (
  <div>
    <Link
        href="https://www.google.com/"
        tag="h1"
        text="h1 link example"
        {...props}
    />
    <Link
        href="https://www.google.com/"
        tag="h6"
        text="h6 link example"
        {...props}
    />
    <Link
        href="https://www.google.com/"
        tag="p"
        text="p link example"
        {...props}
    />
    <div>
      This is a <Link
          href="https://www.google.com/"
          tag="span"
          text="span link example"
          {...props}
    />
    </div>
  </div>
)

export default LinkTag
