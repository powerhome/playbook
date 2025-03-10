import React from 'react'
import Link from '../../pb_link/_link'

const LinkIcon = (props) => (
  <div>
    <div>
      <Link
          href="#icon"
          icon="arrow-up-right-from-square"
          text="link example"
          {...props}
      />
    </div>
    <div>
      <Link
          href="#icon2"
          iconRight="chevron-right"
          text="link example"
          {...props}
      />
    </div>
  </div>
)

export default LinkIcon
