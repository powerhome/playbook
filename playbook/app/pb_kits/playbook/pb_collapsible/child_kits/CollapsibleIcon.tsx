import React from "react";
import Icon, { IconSizes } from "../../pb_icon/_icon";

type IconColors =
  | "default"
  | "light"
  | "lighter"
  | "link"
  | "error"
  | "success";

type IconProps = {
  collapsed: boolean | (() => void);
  icon?: string[] | string;
  iconColor?: IconColors;
  iconSize?: IconSizes;
  onIconClick?: () => void;
};

type colorMap = {
  default: string;
  light: string;
  lighter: string;
  link: string;
  error: string;
  success: string;
};

const colorMap = {
  default: "#242B42",
  light: "#687887",
  lighter: "#C1CDD6",
  link: "#0056CF",
  error: "#FF2229",
  success: "#00CA74",
};

const CollapsibleIcon = ({
  collapsed,
  icon,
  iconSize,
  iconColor,
  onIconClick,
}: IconProps) => {
  const color = colorMap[iconColor];

  const showIcon = (icon: string | string[]) => {
    if (typeof icon === "string") {
      return [icon, icon];
    }
    return icon;
  };

  const handleIconClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onIconClick) {
      e.stopPropagation();
      onIconClick();
    }
  };

  return (
    <>
      {collapsed ? (
        <div
            className="icon_wrapper"
            key={icon ? showIcon(icon)[0] : "chevron-down"}
            onClick={(e) => handleIconClick(e)}
            style={{ verticalAlign: "middle", color: color }}
        >
          <Icon
              icon={icon ? showIcon(icon)[0] : "chevron-down"}
              size={iconSize}
          />
        </div>
      ) : (
        <div
            className="icon_wrapper"
            key={icon ? showIcon(icon)[1] : "chevron-up"}
            onClick={(e) => handleIconClick(e)}
            style={{ verticalAlign: "middle", color: color }}
        >
          <Icon
              icon={icon ? showIcon(icon)[1] : "chevron-up"}
              size={iconSize}
          />
        </div>
      )}
    </>
  );
};

export default CollapsibleIcon;
