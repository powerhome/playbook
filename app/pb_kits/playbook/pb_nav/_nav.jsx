import React from 'react'
import { Caption } from '../'

type NavProps = {
  link: String,
  title: String,
  orientation?: 'vertical' | 'horizontal',
  children?: React.Node,
}

const Nav = (props: NavProps) => {
  const {
    title = '',
    orientation = 'vertical',
    children
  } = props;

  return (
    <div className={`pb_nav_list_${orientation}`}>
      <div className={`pb_nav_list_title`}>
        <a className='pb_nav_list_item_link_text'>
          <Caption size='md' text={`${title}`} />
        </a>
      </div>
      <ul>{children}</ul>
    </div>
  )
}

export default Nav
