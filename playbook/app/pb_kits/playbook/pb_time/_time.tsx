import React from "react";
import classnames from "classnames";

import { getClockIconObject       } from "../utilities/icons/allicons"
import { buildCss, buildHtmlProps } from "../utilities/props";
import { globalProps, GlobalProps } from "../utilities/globalProps";
import DateTime from '../pb_kit/dateTime';

import Body from "../pb_body/_body";
import Caption from "../pb_caption/_caption";
import Icon from "../pb_icon/_icon";

type TimeProps = {
  align?: "left" | "center" | "right";
  className?: string | string[];
  data?: string;
  date: Date;
  dark?: boolean;
  id?: string;
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  showIcon?: boolean;
  size?: "md" | "sm";
  showTimezone?: boolean;
  timeZone?: string;
  unstyled?: boolean;
} & GlobalProps

const Time = (props: TimeProps) => {
  const {
    align,
    className,
    date,
    htmlOptions = {},
    showIcon,
    size,
    timeZone,
    unstyled = false,
    showTimezone = true,
  } = props;

  const classes = classnames(
    buildCss("pb_time_kit", align, size),
    globalProps(props),
    className
  );
  const clockIcon = getClockIconObject()["clock"]
  const htmlProps = buildHtmlProps(htmlOptions);

  return (
    <div 
        {...htmlProps}
        className={classes} 
    >
      {showIcon && (
        unstyled
          ? (
              <span>
                    <Icon
                        className="svg-inline--fa clock"
                        customIcon={clockIcon.icon as unknown as { [key: string]: SVGElement }}
                        icon=""
                    />
                {" "}
              </span>
            )
          : (
            <>
              <Body color="light"
                  tag="span"
              >
              <Icon
                  className="svg-inline--fa clock"
                  customIcon={clockIcon.icon as unknown as { [key: string]: SVGElement }}
                  fixedWidth
                  icon=""
                  size={size === "md" ? "" : "sm"}
              />
                {" "}
              </Body>
            </>
            )
      )}

      <time dateTime={date.toLocaleString()}>
        <span>
          {unstyled
            ? (
                <>
                  <span>
                    {DateTime.toTimeWithMeridiem(date, timeZone)}
                  </span>
                  {" "}
                  {showTimezone && (
                    <span>
                      {DateTime.toTimeZone(date, timeZone)}
                    </span>
                  )}
                </>
              )
            : size === "md"
              ? (
                  <>
                    <Body
                        className="pb_time"
                        tag="span"
                        text={DateTime.toTimeWithMeridiem(date, timeZone)}
                    />{" "}
                    {showTimezone && (
                      <Body
                          color="light"
                          tag="span"
                          text={DateTime.toTimeZone(date, timeZone)}
                      />
                    )}
                  </>
                )
              : (
                  <>
                    <Caption
                        color="light"
                        tag="span"
                        text={DateTime.toTimeWithMeridiem(date, timeZone)}
                    />{" "}
                    {showTimezone && (
                      <Caption
                          color="light"
                          tag="span"
                          text={DateTime.toTimeZone(date, timeZone)}
                      />
                    )}
                  </>
                )}
        </span>
      </time>
    </div>
  );
};

export default Time;
