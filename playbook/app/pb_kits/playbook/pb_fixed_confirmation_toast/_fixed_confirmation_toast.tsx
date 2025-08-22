import React, { useEffect, useState } from "react";
import classnames from "classnames";

import { globalProps } from "../utilities/globalProps";
import { buildHtmlProps } from "../utilities/props";
import { VoidCallback } from "../types";

import Icon from "../pb_icon/_icon";
import Title from "../pb_title/_title";

const iconMap = {
  success: "check",
  error: "exclamation-triangle",
  neutral: "info-circle",
  tip: "info-circle",
};

type FixedConfirmationToastProps = {
  autoClose?: number;
  children?: React.ReactChild[] | React.ReactChild;
  className?: string;
  closeable?: boolean;
  data?: string;
  horizontal?: "right" | "left" | "center";
  htmlOptions?: { [key: string]: string | number | boolean | (VoidCallback) };
  icon?: string,
  id?: string;
  multiLine?: boolean;
  onClose?: VoidCallback;
  open?: boolean;
  status?: "success" | "error" | "neutral" | "tip";
  text?: string;
  vertical?: "top" | "bottom";
};

const FixedConfirmationToast = (props: FixedConfirmationToastProps): React.ReactElement => {
  const [showToast, toggleToast] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  const {
    autoClose = 0,
    children,
    className,
    closeable = false,
    horizontal,
    htmlOptions = {},
    icon,
    multiLine = false,
    onClose = () => undefined,
    open = true,
    status = "neutral",
    text,
    vertical,
  } = props;

  const returnedIcon = icon || iconMap[status]
  const iconClass = icon && icon !== "none" ? "custom_icon" : ""

  const css = classnames(
    `pb_fixed_confirmation_toast_kit_${status}`,
    { _multi_line: multiLine },
    { [`positioned_toast ${vertical} ${horizontal}`]: vertical && horizontal },
    `${iconClass}`,
    globalProps(props),
    className
  );

  const htmlProps = buildHtmlProps(htmlOptions);

  const autoCloseToast = () => {
    if (autoClose && open) {
      setTimeout(() => {
        toggleToast(false);
        onClose();
      }, autoClose);
    }
  };

  useEffect(() => {
    toggleToast(open);
    autoCloseToast();
  }, [open]);

  const handleClick = () => {
    toggleToast(!closeable);
    onClose();
  };

  // prevents Screen Reader from announcing all examples on page load, just dynamic on open
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <>
      {showToast && (
        <div
            aria-atomic={hydrated && open ? "true" : undefined}
            aria-live={hydrated && open ? "polite" : undefined}    
            className={css}
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClick();
            }}
            role="status"
            tabIndex={0}
            {...htmlProps}
        >
          {returnedIcon && icon !== "none" && (
            <Icon
                className="pb_icon"
                fixedWidth
                icon={returnedIcon}
            />
          )}

          {(children && children) ||
            (text && (
              <Title
                  className="pb_fixed_confirmation_toast_text"
                  flex="1"
                  size={4}
                  text={text}
              />
            ))}

          {closeable && (
            <Icon
                aria={{ "label": "Close Toast" }}
                className="pb_icon"
                cursor="pointer"
                fixedWidth={false}
                icon="times"
            />
          )}
        </div>
      )}
    </>
  );
};

export default FixedConfirmationToast;
