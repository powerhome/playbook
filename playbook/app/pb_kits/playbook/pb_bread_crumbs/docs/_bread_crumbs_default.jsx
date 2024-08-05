import React from 'react'
import BreadCrumbs from '../_bread_crumbs'
import { Icon, Title } from 'playbook-ui'
import BreadCrumbItem from '../_bread_crumb_item'

const Link = (props) => <BreadCrumbItem {...props} />
const BreadCrumbsDefault = (props) => {
  return (
    <BreadCrumbs
        text="+1"
        {...props}
    >
      <Icon
          icon="home"
          size="1x"
      />
      <BreadCrumbItem
          {...props}
          href="/home"
      >
        <Title
            size="4"
            tag="span"
            text="Home"
        />
      </BreadCrumbItem>
      <Icon
          icon="users"
          size="1x"
      />
      <Link
          {...props}
          href="/users"
      >
        <Title
            size="4"
            tag="span"
            text="Users"
        />
      </Link>
      <Icon
          icon="user"
          size="1x"
      />
      <Link {...props}>
        <Title
            size="4"
            tag="span"
            text="User"
        />
      </Link>
    </BreadCrumbs>
  )
}

export default BreadCrumbsDefault
