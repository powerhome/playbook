import React from "react";

import classnames from "classnames";
import DateTime from "../pb_kit/dateTime";
import { buildCss, buildDataProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";

import Caption from "../pb_caption/_caption";
import Title from "../pb_title/_title";

type DateStackedProps = {
  align?: "left" | "center" | "right";
  bold?: boolean;
  className?: string | string[];
  dark?: boolean;
  data?: string;
  date: string;
  size?: "sm" | "md";
  id?: string;
  reverse?: boolean;
};

const sizes = {
  sm: 4,
  md: 3,
};

const DateStacked = (props: DateStackedProps) => {
  const {
    align = "left",
    bold = false,
    reverse = false,
    className,
    dark = false,
    date,
    data={},
    size = "sm",
  } = props;
  const classes = classnames(
    buildCss("pb_date_stacked_kit", align, size, {
      dark: dark,
      reverse: reverse,
    }),
    globalProps(props),
    className
  );

  const currentYear = new Date().getFullYear().toString();
  const dateTimestamp = new DateTime({ value: date });
  const inputYear = dateTimestamp.toYear().toString();
  const dataProps = buildDataProps(data)

  return (
    <>
      {bold == false ? (
        <div {...dataProps} className={classes}>
          <div className="pb_date_stacked_day_month">
            <Caption text={dateTimestamp.toMonth().toUpperCase()} />
            <Title
              dark={dark}
              size={sizes[size]}
              text={dateTimestamp.toDay()}
            />
          </div>
          {currentYear != inputYear && <Caption size="xs">{inputYear}</Caption>}
        </div>
      ) : (
          <div {...dataProps} className={classes}>
            <div className="pb_date_stacked_day_month">
              <Title 
                bold 
                dark={dark} 
                size="4" 
                text={dateTimestamp.toMonth()} 
              />
              <Title 
                bold 
                dark={dark} 
                size="4" 
                text={dateTimestamp.toDay()} 
              />
              {currentYear != inputYear && <Title size="4">{inputYear}</Title>}
            </div>
          </div>
      )}
    </>
  );
};

export default DateStacked;
