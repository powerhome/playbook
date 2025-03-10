import React from 'react'
import Link from '../../pb_link/_link'

const LinkDisabled = (props) => (
  <div>
    <Link
        disabled
        href="#disabled"
        text="link example"
        {...props}
    />
  </div>
)

export default LinkDisabled
