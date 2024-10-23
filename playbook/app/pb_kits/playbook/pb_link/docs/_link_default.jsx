import React from 'react'
import { Link } from 'playbook-ui'

const LinkDefault = (props) => (
  <div>
    <div>
      <Link
          href="https://www.google.com/"
          text="link example"
          {...props}
      />
    </div>
    <div>
      <Link
          color="body"
          href="https://www.google.com/"
          text="link example"
          {...props}
      />
    </div>
    <div>
      <Link
          color="muted"
          href="https://www.google.com/"
          text="link example"
          {...props}
      />
    </div>
    <div>
      <Link
          color="destructive"
          href="https://www.google.com/"
          text="link example"
          {...props}
      />
    </div>
    <div>
      <Link
          href="https://www.google.com/"
          text="link example"
          underlined
          {...props}
      />
    </div>
  </div>
)

export default LinkDefault
