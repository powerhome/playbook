import React from "react";
import classnames from "classnames";

import { buildCss } from "../utilities/props";
import { globalProps, GlobalProps } from "../utilities/globalProps";
import { toTimeZone, toTimeWithMeridiem } from '../pb_kit/dateTime'

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

  return (
    <div className={classes}>
      {showIcon && (
        unstyled
          ? (
              <span>
                <Icon fixedWidth
                    icon="clock"
                />
                {" "}
              </span>
            )
          : (
            <>
              <Body color="light"
                  tag="span"
              >
                <Icon fixedWidth
                    icon="clock"
                    size={size === "md" ? "" : "sm"}
                />
                {" "}
              </Body>
            </>
            )
      )}

      <time dateTime={date.toString()}>
        <span>
          {unstyled
            ? (
                <>
                  <span>
                    {toTimeWithMeridiem(date, timeZone)}
                  </span>
                  {" "}
                  {showTimezone && (
                    <span>
                      {toTimeZone(date, timeZone)}
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
                        text={toTimeWithMeridiem(date, timeZone)}
                    />{" "}
                    {showTimezone && (
                      <Body
                          color="light"
                          tag="span"
                          text={toTimeZone(date, timeZone)}
                      />
                    )}
                  </>
                )
              : (
                  <>
                    <Caption
                        color="light"
                        tag="span"
                        text={toTimeWithMeridiem(date, timeZone)}
                    />{" "}
                    {showTimezone && (
                      <Caption
                          color="light"
                          tag="span"
                          text={toTimeZone(date, timeZone)}
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
