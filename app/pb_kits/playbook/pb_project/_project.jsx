/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import LabelValue from '../pb_label_value/_label_value.jsx'
import IconBodyTitle from '../pb_icon_body_title/_icon_body_title.jsx'
import classnames from 'classnames'

type ProjectProps = {
  className?: String,
  data?: String,
  date?: Date,
  id?: String,
  link?: String,
  ownerName: String,
  projectNumber: String,
  
}

const Project = ({ className, data, date, id, link, ownerName, projectNumber }: ProjectProps) =>  {
  let title = ownerName;
  if(date != null) {
    title += ` ${String.fromCharCode(183)} ${date}`
  }
  return (<div className={classnames("pb_home_kit", className)} id={id} data={data}>
    <LabelValue label="Project">
      <IconBodyTitle 
        body={projectNumber}
        icon="home" 
        link={link}
        title={title} 
      />
    </LabelValue>
  </div>
)}

export default Project
