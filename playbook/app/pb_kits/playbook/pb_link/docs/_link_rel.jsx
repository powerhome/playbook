import React from 'react'
import Link from '../../pb_link/_link'

const LinkRel = (props) => (
  <div>
    <div>
      <Link
          aria={{ label: 'Link to Playbook in a named tab, opens a new tab on every click' }}
          href="https://playbook.powerapp.cloud/"
          tabIndex={0}
          target="playbookDocs"
          text="Named Tab (default rel)"
          {...props}
      />
    </div>
    <div>
      <Link
          aria={{ label: 'Link to Playbook in a named tab, reused on repeat clicks' }}
          href="https://playbook.powerapp.cloud/"
          rel=""
          tabIndex={0}
          target="playbookDocs"
          text="Named Tab (rel override, reusable)"
          {...props}
      />
    </div>
  </div>
)

export default LinkRel
