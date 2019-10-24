/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from "react";
import classnames from "classnames";
import Icon from "../pb_icon/_icon.jsx";

type CircleIconButtonProps = {
  className?: String,
  data?: String,
  icon: String,
  id?: String,
  link: String,
  variant?: "primary" | "secondary" | "link"
};

const CircleIconButton = ({
  className,
  data,
  icon,
  id,
  link,
  variant = "primary"
}: CircleIconButtonProps) => {
  return (
    <div className={`pb_circle_icon_button_kit_${variant} ${className}`}>
      <a href={link}>
        <Icon fixedWidth
            icon={icon}
        />
      </a>
    </div>
  );
};

export default CircleIconButton;
