import React from 'react'
import BreadCrumb from '../_bread_crumb.jsx'

const BreadCrumbDefault = (props) => {
  return (
    <div>
      <BreadCrumb
          text="+1"
          {...props}
      />
    </div>
  )
}

export default BreadCrumbDefault
