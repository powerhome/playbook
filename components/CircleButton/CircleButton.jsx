/* @flow */

import React from 'react'
import Icon from '../Icon/Icon.jsx'
import classnames from 'classnames'

type Props = {
  className:string,
  iconName:string,
  size:string,
  color: string,
  iconColor:string,
  name:string,

}

export default class CircleButton extends React.Component<Props> {
  static defaultProps = {
    color:"",
    size:"",
    textColor:"",
    iconName:"",
    className:"circlebutton",


  }
  props: Props

  render() {

    const {
      size,
      color,
      iconName,
      iconColor,
      className,
    } = this.props



    return (

        <div>
          <button className={`${classnames(color,iconColor,className)} circlebutton-${size} border-0 shadow-default`}>
            <Icon name={iconName}/>
          </button>
        </div>
    )

  }
}
