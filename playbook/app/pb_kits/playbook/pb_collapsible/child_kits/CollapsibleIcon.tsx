import React from "react";
import Icon, { IconSizes } from "../../pb_icon/_icon";
import colors from '../../tokens/exports/_colors.module.scss'

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
  default:"text_lt_default",
  light: "text_lt_light",
  lighter: "text_lt_lighter",
  link: "primary",
  error: "red",
  success: "text_dk_success_sm",
};

const CollapsibleIcon = ({
  collapsed,
  icon,
  iconSize,
  iconColor,
  onIconClick,
}: IconProps) => {
  const color = colorMap[iconColor];
  console.log('color', color);

  const showIcon = (icon: string | string[]) => {
    if (icon === "none") {
      return []
    } else if (typeof icon === "string") {
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
      {(icon !== "none") ? (  
        collapsed ? (
          <div
              className="icon_wrapper"
              key={icon ? showIcon(icon)[0] : "chevron-down"}
              onClick={(e) => handleIconClick(e)}
              style={{ verticalAlign: "middle"}}
          >
            <Icon
                color={color}
                icon={icon ? showIcon(icon)[0] : "chevron-down"}
                size={iconSize}
            />
          </div>
        ) : (
          <div
              className="icon_wrapper"
              key={icon ? showIcon(icon)[1] : "chevron-up"}
              onClick={(e) => handleIconClick(e)}
              style={{ verticalAlign: "middle" }}
          >
            <Icon
                color={color}
                icon={icon ? showIcon(icon)[1] : "chevron-up"}
                size={iconSize}
            />
          </div>
        )
      ) : (
        <div/>
      )}
    </>
  );
};

export default CollapsibleIcon;
