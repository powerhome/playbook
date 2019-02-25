/* @flow */

import React from 'react'
import Icon from '../Icon/Icon'


type Props = {
    children?: Array<React.Node>,
    className?: string,
    iconOption1?:string,
    iconOption2?:string,
    size:string,
    color:string,
}

export default class IconToggle extends React.Component<Props> {

  static defaultProps = {
    color: "text-sky",
    className: "icon-toggle",
    iconOption1:"minus-circle",
    iconOption2:"plus-circle",
    size:"text-larger",
  }

  props: Props

  render() {
    const{
      className,
      iconOption1,
      iconOption2,
      color,
      size,
    } = this.props


    return (
      <div>
          <label className={`icon-toggle ${size} m-0`}>
          <input className=""
              type="checkbox"
          />
         <Icon className={`${className,color}`}
             name={iconOption1}
             title={`icon-1`}
         />
          <Icon className={`ml-4 ${className,color}`}
              name={iconOption2}
              title={`icon-2`}
          />
        </label>
    </div>
   )
  }
}
