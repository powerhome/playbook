import React from "react";
import classnames from "classnames";

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import DateTime from '../pb_kit/dateTime';

import Body from "../pb_body/_body";
import Caption from "../pb_caption/_caption";
import Icon from "../pb_icon/_icon";
import Title from "../pb_title/_title";

type PbDateProps = {
  alignment?: "left" | "center" | "right";
  aria?: { [key: string]: string };
  className?: string;
  dark?: boolean;
  data?: { [key: string]: string };
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  id?: string;
  showDayOfWeek?: boolean;
  showCurrentYear?: boolean;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  unstyled?: boolean;
  value: Date;
};

const PbDate = (props: PbDateProps): React.ReactElement => {
  const {
    aria = {},
    alignment = "left",
    className,
    dark = false,
    data = {},
    htmlOptions = {},
    id,
    showDayOfWeek = false,
    showCurrentYear = false,
    showIcon = false,
    size = "md",
    unstyled = false,
    value,
  } = props;

  const weekday = DateTime.toWeekday(value);
  const month = DateTime.toMonth(value);
  const day = DateTime.toDay(value);
  const year = DateTime.toYear(value);
  const currentYear = new Date().getFullYear();

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const classes = classnames(
    buildCss("pb_date_kit", alignment),
    globalProps(props),
    className
  );

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {unstyled
        ? <>
            {showIcon && (
              <div>
                <Icon fixedWidth
                    icon="calendar-alt"
                />
              </div>
            )}

            {showDayOfWeek && (
              <>
                <div>
                  {weekday}
                </div>

                <div>{"•"}</div>
              </>
            )}

            <span>
              <span>
                {month} {day}
              </span>

              {(currentYear !== year || showCurrentYear) && <span>{`, ${year}`}</span>}
            </span>
          </>
        : size == "md" || size == "lg"
          ? (
            <Title
                dark={dark}
                size={4}
                tag="h4"
            >
              {showIcon && (
                <Body className="pb_icon_kit_container"
                    color="light"
                    tag="span"
                >
                  <Icon fixedWidth
                      icon="calendar-alt"
                  />
                </Body>
              )}

              {showDayOfWeek && (
                <>
                  {weekday}
                  <Body color="light"
                      tag="span"
                      text=" • "
                  />
                </>
              )}

              <span>
                {month} {day}
              </span>
              {(currentYear !== year || showCurrentYear) && <span>{`, ${year}`}</span>}
            </Title>
            )
          : (
              <>
                {showIcon && (
                  <Caption className="pb_icon_kit_container"
                      dark={dark}
                      tag="span"
                  >
                    <Icon fixedWidth
                        icon="calendar-alt"
                        size="sm"
                    />
                  </Caption>
                )}

                {showDayOfWeek && (
                  <>
                    <Caption dark={dark}
                        tag="div">
                        {weekday}
                    </Caption>
                    <Caption color="light"
                        dark={dark}
                        tag="div"
                        text=" • "
                    />
                  </>
                )}

                <Caption dark={dark}
                    tag="span">
                  {month} {day}
                  {(currentYear !== year || showCurrentYear) && <>{`, ${year}`}</>}
                </Caption>
              </>
            )}
    </div>
  );
};

export default PbDate;
