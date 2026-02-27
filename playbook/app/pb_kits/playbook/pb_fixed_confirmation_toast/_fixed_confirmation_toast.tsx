import React, { useEffect, useState, useRef } from "react";
import classnames from "classnames";

import { globalProps, GlobalProps } from "../utilities/globalProps";
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
  navMarginTop?: boolean;
  onClose?: VoidCallback;
  open?: boolean;
  status?: "success" | "error" | "neutral" | "tip";
  text?: string;
  vertical?: "top" | "bottom";
  zIndex?: number | string;
} & GlobalProps

const FixedConfirmationToast = (props: FixedConfirmationToastProps): React.ReactElement => {
  const [showToast, toggleToast] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    autoClose = 0,
    children,
    className,
    closeable = false,
    horizontal,
    htmlOptions = {},
    icon,
    multiLine = false,
    navMarginTop = false,
    onClose = () => undefined,
    open = true,
    status = "neutral",
    text,
    vertical,
    zIndex = 'max',
  } = props;

  const returnedIcon = icon || iconMap[status]
  const iconClass = icon && icon !== "none" ? "custom_icon" : ""

  const css = classnames(
    `pb_fixed_confirmation_toast_kit_${status}${multiLine ? '_multi_line' : ''}`,
    { [`positioned_toast ${vertical} ${horizontal}`]: vertical && horizontal },
    { [`nav_margin_top`]: navMarginTop },
    `${iconClass}`,
    globalProps(props, { zIndex }),
    className
  );

  const htmlProps = buildHtmlProps(htmlOptions);

  useEffect(() => {
    toggleToast(open);
  }, [open]);

  // Manage auto-close timeout separately
  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Set new timeout if autoClose is enabled and toast is open
    if (autoClose && open && showToast) {
      timeoutRef.current = setTimeout(() => {
        toggleToast(false);
        onClose();
        timeoutRef.current = null;
      }, autoClose);
    }

    // Cleanup function to clear timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [autoClose, open, showToast, onClose]);

  const handleClick = () => {
    // Clear autoClose timeout when manually closing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    toggleToast(!closeable);
    onClose();
  };

  return (
    <>
      {showToast && (
        <div
            aria-atomic="true"
            aria-live="polite"
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
