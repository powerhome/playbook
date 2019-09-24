/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import LabelValue from '../pb_label_value/_label_value.jsx';
import IconBodyTitle from '../pb_icon_body_title/_icon_body_title.jsx';

type InventoryLocationProps = {
  bin?: String,
  className?: String,
  data?: String,
  id?: String,
  link?: String,
  type?: 'rack' | 'cart' | 'zone',
}

const icons = {
  rack: 'inventory',
  cart: 'dolly-flatbed',
  zone: 'flag-checkered'
}

const InventoryLocation = ({ bin, className, data,  id, link, type }: InventoryLocationProps) => {
  return (<div className={className} id={id} data={data}>
    <LabelValue label="Location">
      <IconBodyTitle icon={icons[type]} body={type} title={bin} link={link} />
    </LabelValue>
  </div>
  )
}

export default InventoryLocation
