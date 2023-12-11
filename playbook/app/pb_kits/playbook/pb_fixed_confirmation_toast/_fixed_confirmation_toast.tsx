import React, { useEffect, useState } from "react";
import classnames from "classnames";

import { globalProps } from "../utilities/globalProps";
import { buildHtmlProps } from '../utilities/props'

import Icon from "../pb_icon/_icon";
import Title from "../pb_title/_title";

const iconMap = {
  success: "check",
  error: "exclamation-triangle",
  neutral: "info-circle",
  tip: "info-circle",
};

type FixedConfirmationToastProps = {
  autoClose?: number,
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  closeable?: boolean,
  data?: string,
  horizontal?: "right" | "left" | "center",
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  id?: string,
  multiLine?: boolean,
  onClose?: () => void,
  open?: boolean,
  status?: "success" | "error" | "neutral" | "tip",
  text?: string,
  vertical?: "top" | "bottom",
}

const FixedConfirmationToast = (props: FixedConfirmationToastProps) => {
  const [showToast, toggleToast] = useState(true);
  const {
    autoClose = 0,
    children,
    className,
    closeable = false,
    horizontal,
    htmlOptions = {},
    multiLine = false,
    onClose = () => { },
    open = true,
    status = "neutral",
    text,
    vertical,
  } = props;
  const css = classnames(
    `pb_fixed_confirmation_toast_kit_${status}`,
    { _multi_line: multiLine },
    { [`positioned_toast ${vertical} ${horizontal}`]: vertical && horizontal },
    globalProps(props),
    className
  );
  const icon = iconMap[status];

  const htmlProps = buildHtmlProps(htmlOptions);

  const autoCloseToast = () => {
    if (autoClose && open) {
      setTimeout(() => {
        toggleToast(false);
        onClose();
      }, autoClose);
    }
  }

  useEffect(() => {
    toggleToast(open);
    autoCloseToast();
  }, [open]);

  const handleClick = () => {
    toggleToast(!closeable);
    onClose();
  };

  return (
    <>
      {showToast && (
        <div className={css} onClick={handleClick} {...htmlProps}>
          {icon && <Icon className="pb_icon" fixedWidth icon={icon} />}

          {
            children && children ||
            text && (
              <Title
                className="pb_fixed_confirmation_toast_text"
                size={4}
                text={text}
              />
            )
          }

          {closeable && (
            <Icon className="pb_icon" cursor="pointer" fixedWidth={false} icon="times" />
          )}
        </div>
      )}
    </>
  );
};

export default FixedConfirmationToast;
