import React from 'react'
import { Link } from 'playbook-ui'

const LinkIcon = (props) => (
  <div>
    <div>
      <Link
          href="https://www.google.com/"
          icon="arrow-up-right-from-square"
          text="link example"
          {...props}
      />
    </div>
    <div>
      <Link
          href="https://www.google.com/"
          iconRight="chevron-right"
          text="link example"
          {...props}
      />
    </div>
  </div>
)

export default LinkIcon
