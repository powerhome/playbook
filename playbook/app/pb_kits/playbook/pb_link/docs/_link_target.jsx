import React from 'react'
import { Link } from 'playbook-ui'

const LinkTarget = (props) => (
  <div>
    <div>
      <Link
          aria={{ label: 'Link to Google in new window' }}
          href="https://google.com"
          newWindow
          tabIndex={0}
          text="Open in New Window"
          {...props}
      />
    </div>
    <div>
      <Link
          aria={{ label: 'Link to Playbook in new window' }}
          href="https://playbook.powerapp.cloud/"
          tabIndex={0}
          target='child'
          text="Open in a Child Tab"
          {...props}
      />
    </div>
  </div>
)

export default LinkTarget
