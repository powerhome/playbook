import React from 'react'
import Link from '../../pb_link/_link'

const LinkTarget = (props) => (
  <div>
    <div>
      <Link
          aria={{ label: 'Link to Google in new window' }}
          href="https://google.com"
          tabIndex={0}
          target='blank'
          text="Open In New Window"
          {...props}
      />
    </div>
    <div>
      <Link
          aria={{ label: 'Link to Playbook in a child tab' }}
          href="https://playbook.powerapp.cloud/"
          tabIndex={0}
          target='child'
          text="Open In Child Tab"
          {...props}
      />
    </div>
  </div>
)

export default LinkTarget
