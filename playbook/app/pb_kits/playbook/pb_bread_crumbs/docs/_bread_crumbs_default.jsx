import React from 'react'
import BreadCrumbs from '../_bread_crumbs.jsx'
import { Icon, Title } from '../../';
import BreadCrumbItem from '../_bread_crumb_item'

const Link = (props) => <BreadCrumbItem {...props}/>
const BreadCrumbsDefault = (props) => {

  return (
      <BreadCrumbs
          text="+1"
          {...props}
      >
        <Link {...props} href="/home">
          <Icon icon="home" size="1x" />
          <Title size="4" text="Home" />
        </Link>
        <Link {...props} href="/users">
          <Icon icon="users" size="1x" />
          <Title size="4" text="Users" />
        </Link>
        <Link {...props} >
          <Icon icon="user" size="1x" />
          <Title size="4" text="User" />
        </Link>
      </BreadCrumbs>
  )
}

export default BreadCrumbsDefault
