import React from 'react'
import Link from '../../pb_link/_link'

const LinkTag = (props) => (
  <div>
    <Link
        href="#tag"
        icon="arrow-up-right-from-square"
        tag="h1"
        text="h1 link example"
        {...props}
    />
    <Link
        href="#tag2"
        tag="h3"
        text="h3 link example"
        underline
        {...props}
    />
    <Link
        color="destructive"
        href="#tag3"
        tag="h6"
        text="h6 link example"
        {...props}
    />
    <Link
        href="#tag4"
        iconRight="chevron-right"
        tag="p"
        text="p link example"
        {...props}
    />
    <div>
      This is a <Link
          href="#tag5"
          tag="span"
          text="span link example"
          {...props}
    />
    </div>
  </div>
)

export default LinkTag
