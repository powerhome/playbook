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
  default: "#242B42",
  light: colors.text_lt_light,
  lighter: colors.text_lt_lighter,
  link: colors.primary,
  error: "#FF2229",
  success: colors.text_dk_success_sm,
};

const CollapsibleIcon = ({
  collapsed,
  icon,
  iconSize,
  iconColor,
  onIconClick,
}: IconProps) => {
  const color = colorMap[iconColor ?? "default"];

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
console.log('iconColor prop:', iconColor);
console.log('Computed color:', color);

  return (
    <>
      {(icon !== "none") ? (  
        collapsed ? (
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
        )
      ) : (
        <div/>
      )}
    </>
  );
};

export default CollapsibleIcon;
