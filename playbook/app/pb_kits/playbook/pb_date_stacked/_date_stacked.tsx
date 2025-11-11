import React from "react";

import classnames from "classnames";
import { buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import DateTime from '../pb_kit/dateTime';

import Caption from "../pb_caption/_caption";
import Title from "../pb_title/_title";

type DateStackedProps = {
  align?: "left" | "center" | "right";
  bold?: boolean;
  className?: string | string[];
  dark?: boolean;
  data?: string;
  date: Date;
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) };
  size?: "sm" | "md";
  id?: string;
  reverse?: boolean;
  showCurrentYear?: boolean;
};

const sizes: {sm: 4, md: 3} = {
  sm: 4,
  md: 3,
};

const DateStacked = (props: DateStackedProps): React.ReactElement => {
  const {
    align = "left",
    bold = false,
    reverse = false,
    className,
    dark = false,
    date,
    data={},
    htmlOptions={},
    size = "sm",
    showCurrentYear = false,
  } = props;
  const classes = classnames(
    buildCss("pb_date_stacked_kit", align, size, {
      dark: dark,
      reverse: reverse,
    }),
    globalProps(props),
    className
  );

  const currentYear = new Date().getFullYear()
  const inputYear = DateTime.toYear(date);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <>
      {bold == false ? (
        <div
            {...dataProps}
            {...htmlProps}
            className={classes}
        >
          <div className="pb_date_stacked_day_month">
            <Caption text={DateTime.toMonth(date).toUpperCase()} />
            <Title
                dark={dark}
                size={sizes[size]}
                text={DateTime.toDay(date).toString()}
            />
          </div>
          {(currentYear != inputYear || showCurrentYear) && <Caption size="xs">{inputYear}</Caption>}
        </div>
      ) : (
          <div
              {...dataProps}
              {...htmlProps}
              className={classes}
          >
            <div className="pb_date_stacked_day_month">
              <Title
                  bold
                  dark={dark}
                  size="4"
                  text={DateTime.toMonth(date)}
              />
              <Title
                  bold
                  dark={dark}
                  size="4"
                  text={DateTime.toDay(date).toString()}
              />
              {(currentYear != inputYear || showCurrentYear) && <Title size="4">{inputYear}</Title>}
            </div>
          </div>
      )}
    </>
  );
};

export default DateStacked;
