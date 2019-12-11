import React, { Component } from 'react'
import NavItem from './_item'
import {Caption} from '../'

type NavProps = {
  link: String,
  title: String,
  orientation?: 'vertical' | 'horizontal',
  children?: Array<React.ReactNode> | React.ReactNode,
}

const Nav = (props: Nav) => {
  const {
    title = '',
    orientation = 'vertical',
  } = this.props;

  return (
    <div className={`pb_nav_list_${orientation}`}>
      <div className={`pb_nav_list_title`}>
        <a className='pb_nav_list_item_link_text'>
          <Caption size='md' text={`${title}`} />
        </a>
      </div>
      <ul>{this.props.children}</ul>
    </div>
  )
}

export default Nav