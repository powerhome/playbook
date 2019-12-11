import React, { Component } from 'react';

type NavItemProps = {
  text: String,
  link: String,
  active?: Boolean,
  children: Array<React.ReactChild> | React.ReactChild,
}

const NavItem = (props: NavItemProps) => {
  const { 
    text = '', 
    link = '', 
    active = false, 
    children
  } = this.props;

  const active_class = active === true ? '_active' : ''

  return (
    <li className={`pb_nav_list_border_item${active_class}`}>
      <a className='pb_nav_list_item_link' href={link}>
        <span className='pb_nav_list_item_text'>
          { text || children }
        </span>
      </a>
    </li>
  );
}

export default NavItem;
