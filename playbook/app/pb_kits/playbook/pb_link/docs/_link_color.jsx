import React from 'react'
import { Link } from 'playbook-ui'

const LinkColor = (props) => (
  <div>
    <div>
      <Link
          href="https://www.google.com/search?q=playbook+design+system"
          text="link example"
          {...props}
      />
    </div>
    <div>
      <Link
          color="body"
          href="https://www.youtube.com/@PowerHRG"
          text="link example"
          {...props}
      />
    </div>
    <div>
      <Link
          color="muted"
          href="https://github.com/powerhome/.github/blob/main/profile/README.md"
          text="link example"
          {...props}
      />
    </div>
    <div>
      <Link
          color="destructive"
          href="https://rubygems.org/gems/playbook_ui/"
          text="link example"
          {...props}
      />
    </div>
  </div>
)

export default LinkColor
