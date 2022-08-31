import React from "react";
import classnames from "classnames";

import DateTime from "../pb_kit/dateTime";
import { buildAriaProps, buildCss, buildDataProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

import Body from "../pb_body/_body";
import Caption from "../pb_caption/_caption";
import Icon from "../pb_icon/_icon";
import Title from "../pb_title/_title";

type PbDateProps = {
  alignment?: "left" | "center" | "right";
  aria?: { [key: string]: string };
  className?: string;
  data?: { [key: string]: string };
  id?: string;
  showDayOfWeek?: boolean;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  value: string | Date;
};

const PbDate = (props: PbDateProps) => {
  const {
    aria = {},
    alignment = "left",
    className,
    data = {},
    id,
    showDayOfWeek = false,
    showIcon = false,
    size = "md",
    value,
  } = props;

  const dateTimestamp = new DateTime({ value: value });
  const weekday = dateTimestamp.toWeekday();
  const month = dateTimestamp.toMonth();
  const day = dateTimestamp.toDay();
  const year = dateTimestamp.toYear();
  const currentYear = new Date().getFullYear().toString();

  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);

  const classes = classnames(
    buildCss("pb_date_kit", alignment),
    globalProps(props),
    className
  );

  return (
    <div {...ariaProps} {...dataProps} className={classes} id={id}>
      {size == "md" || size == "lg" ? (
        <Title size={4} tag="h4">
          {showIcon && (
            <Body className="pb_icon_kit_container" color="light" tag="span">
              <Icon fixedWidth icon="calendar-alt" />
            </Body>
          )}

          {showDayOfWeek && (
            <>
              {weekday}
              <Body color="light" tag="span" text=" • " />
            </>
          )}

          <span>
            {month} {day}
          </span>
          {currentYear != year && <span>{`, ${year}`}</span>}
        </Title>
      ) : (
        <>
          {showIcon && (
            <Caption className="pb_icon_kit_container" tag="span">
              <Icon fixedWidth icon="calendar-alt" size="sm" />
            </Caption>
          )}

          {showDayOfWeek && (
            <>
              <Caption tag="div">{weekday}</Caption>
              <Caption color="light" tag="div" text=" • " />
            </>
          )}

          <Caption tag="span">
            {month} {day}
            {currentYear != year && <>{`, ${year}`}</>}
          </Caption>
        </>
      )}
    </div>
  );
};

export default PbDate;
