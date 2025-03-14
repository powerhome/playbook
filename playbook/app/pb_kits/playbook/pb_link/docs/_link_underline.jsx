import React from 'react'
import Link from '../../pb_link/_link'

const LinkUnderline = (props) => (
  <div>
    <Link
        href="#underline"
        text="link example"
        underline
        {...props}
    />
  </div>
)

export default LinkUnderline
