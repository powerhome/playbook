/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import LabelValue from '../pb_label_value/_label_value.jsx'
import IconBodyTitle from '../pb_icon_body_title/_icon_body_title.jsx'
import classnames from 'classnames'

type InstallerProps = {
  className?: String,
  data?: String,
  id?: String,
  link?: String,
  name: String,
  
}

const Installer = ({ className, data, id, link, name }: InstallerProps) => {
  return (<div className={classnames("pb_installer_kit", className)} id={id} data={data}>
    <LabelValue label="Installer">
      <IconBodyTitle 
        icon="truck" 
        link={link}
        title={name} 
      />
    </LabelValue>
  </div>
)}

export default Installer
