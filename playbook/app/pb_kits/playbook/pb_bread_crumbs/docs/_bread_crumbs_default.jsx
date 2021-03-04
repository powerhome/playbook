import React from 'react'
import BreadCrumbs from '../_bread_crumbs.jsx'
import { Icon } from '../../';

const BreadCrumbsDefault = (props) => {
  return (
      <BreadCrumbs
          text="+1"
          {...props}
      >
        
        <div>
          <Icon icon="home"/>
          <a href="">Home</a>
        </div>
        <div>
          <Icon icon="list" />
          Collections
        </div>

      </BreadCrumbs>
  )
}

export default BreadCrumbsDefault
