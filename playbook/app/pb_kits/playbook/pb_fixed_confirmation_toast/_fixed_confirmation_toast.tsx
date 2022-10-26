import React, { useEffect, useState } from "react";
import classnames from "classnames";

import { globalProps } from "../utilities/globalProps";

import Icon from "../pb_icon/_icon";
import Title from "../pb_title/_title";

const iconMap = {
  success: "check",
  error: "exclamation-triangle",
  neutral: "info-circle",
  tip: "info-circle",
};

type FixedConfirmationToastProps = {
  className?: string;
  closeable?: boolean;
  data?: string;
  horizontal?: "right" | "left" | "center";
  id?: string;
  multiLine?: boolean;
  onClose?: () => void;
  open?: boolean;
  status?: "success" | "error" | "neutral" | "tip";
  text: string;
  vertical?: "top" | "bottom";
};

const FixedConfirmationToast = (props: FixedConfirmationToastProps) => {
  const [showToast, toggleToast] = useState(true);
  const {
    className,
    closeable = false,
    horizontal,
    multiLine = false,
    onClose = () => {},
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

  useEffect(() => {
    toggleToast(open);
  }, [open]);

  const handleClick = () => {
    toggleToast(!closeable);
    onClose();
  };

  return (
    <>
      {showToast && (
        <div className={css} onClick={handleClick}>
          {icon && <Icon className="pb_icon" fixedWidth icon={icon} />}
          <Title
            className="pb_fixed_confirmation_toast_text"
            size={4}
            text={text}
          />
          {closeable && (
            <Icon className="pb_icon" fixedWidth={false} icon="times" />
          )}
        </div>
      )}
    </>
  );
};

export default FixedConfirmationToast;
