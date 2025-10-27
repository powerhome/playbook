import React from 'react'
import BreadCrumbs from '../_bread_crumbs'
import Icon from "../../pb_icon/_icon"
import Title from "../../pb_title/_title"
import BreadCrumbItem from '../_bread_crumb_item'

const Link = (props) => <BreadCrumbItem {...props} />
const BreadCrumbsDefault = (props) => {
  return (
    <BreadCrumbs
        text="+1"
        {...props}
    >
      <Icon
          color="link"
          icon="home"
          size="1x"
          {...props}
      />
      <BreadCrumbItem
          {...props}
          href="/home"
      >
        <Title
            color="link"
            size="4"
            tag="span"
            text="Home"
            {...props}
        />
      </BreadCrumbItem>
      <Icon
          color="link"
          icon="users"
          size="1x"
          {...props}
      />
      <Link
          {...props}
          href="/users"
      >
        <Title
            color="link"
            size="4"
            tag="span"
            text="Users"
            {...props}
        />
      </Link>
      <Icon
          icon="user"
          size="1x"
          {...props}
      />
      <Link {...props}>
        <Title
            size="4"
            tag="span"
            text="User"
            {...props}
        />
      </Link>
    </BreadCrumbs>
  )
}

export default BreadCrumbsDefault
