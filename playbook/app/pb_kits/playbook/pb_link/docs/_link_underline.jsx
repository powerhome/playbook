import React from 'react'
import Link from '../../pb_link/_link'

const LinkUnderline = (props) => (
  <div>
    <Link
        href="#underline1"
        text="link example"
        underline
        {...props}
    />

    <br />

    <Link
        color="body"
        href="#underline2"
        text="link example"
        underline
        {...props}
    />

    <br />

    <Link
        color="muted"
        href="#underline3"
        text="link example"
        underline
        {...props}
    />

    <br />

    <Link
        color="destructive"
        href="#underline4"
        text="link example"
        underline
        {...props}
    />
  </div>
)

export default LinkUnderline
