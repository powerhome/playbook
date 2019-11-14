/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from "classnames"
import {Button, Icon} from "../"

type CircleIconButtonProps = {
  button: Object,
  className?: String,
  icon: String,
  id?: String,
};

const CircleIconButton = (props: CircleIconButtonProps) => {
  const {
    button,
    className,
    icon,
    id,
  } = props
  
  return (
    <div id={id} className={classnames(`pb_circle_icon_button_kit`, className)}>
      <Button {...button} text={null} id="pb_circle_icon_button_button">
        <Icon fixedWidth icon={icon} />
      </Button>
    </div>
  );
}

export default CircleIconButton;
