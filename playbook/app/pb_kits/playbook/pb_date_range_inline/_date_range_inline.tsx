import React from "react";
import classnames from "classnames";

import { globalProps } from "../utilities/globalProps";
import { buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import DateTime from '../pb_kit/dateTime';

import Body from "../pb_body/_body";
import Caption from "../pb_caption/_caption";
import Icon from "../pb_icon/_icon";

type DateRangeInlineProps = {
  className?: string;
  id?: string;
  data?: string;
  align?: "left" | "center" | "vertical";
  size?: "sm" | "xs";
  dark?: boolean;
  htmlOptions?: {[key: string]: string | number | boolean | Function};
  icon?: boolean;
  startDate?: Date;
  endDate?: Date;
};

const dateTimestamp = (dateValue: Date, includeYear: boolean) => {
  if (includeYear) {
    return `${DateTime.toMonth(dateValue)} ${DateTime.toDay(dateValue)}, ${DateTime.toYear(dateValue)}`;
  } else {
    return `${DateTime.toMonth(dateValue)} ${DateTime.toDay(dateValue)}`;
  }
};

const dateTimeIso = (dateValue: Date) => {
  return DateTime.toIso(dateValue);
};

const DateRangeInline = (props: DateRangeInlineProps): React.ReactElement => {
  const {
    icon = false,
    dark = false,
    size = "sm",
    align = "left",
    data = {},
    htmlOptions = {},
    startDate,
    endDate,
    className,
  } = props;

  const iconContent = () => {
    return (
      <>
        {icon && (
          <>
            <Body color="light"
                key={Math.random()}
                tag="span"
            >
              <Icon
                  className="pb_date_range_inline_icon"
                  dark={dark}
                  fixedWidth
                  icon="calendar-alt"
                  size={size}
                  tag="span"
              />
            </Body>
          </>
        )}
      </>
    );
  };

  const dateInCurrentYear = () => {
    const currentDate = new Date();
    return (
      startDate.getFullYear() == endDate.getFullYear() &&
      startDate.getFullYear() == currentDate.getFullYear()
    );
  };

  const dateRangeClasses = buildCss("pb_date_range_inline_kit", align);
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const renderTime = (date: Date) => {
    return (
      <time dateTime={dateTimeIso(date)}>
        {dateInCurrentYear() ? (
          <>{` ${dateTimestamp(date, false)} `}</>
        ) : (
          <>{` ${dateTimestamp(date, true)} `}</>
        )}
      </time>
    );
  };

  return (
    <div
        {...dataProps}
        {...htmlProps}
        className={classnames(dateRangeClasses, globalProps(props), className)}
    >
      <div className="pb_date_range_inline_wrapper">
        {size == "xs" && (
          <>
            {iconContent()}
            <Caption dark={dark}
                tag="span"
            >
              {renderTime(startDate)}
            </Caption>
            <Caption dark={dark}
                tag="span"
            >
              <Icon
                  className="pb_date_range_inline_arrow"
                  fixedWidth
                  icon="long-arrow-right"
              />
            </Caption>
            <Caption dark={dark}
                tag="span"
            >
              {renderTime(endDate)}
            </Caption>
          </>
        )}

        {size == "sm" && (
          <>
            {iconContent()}
            <Body dark={dark}
                tag="span"
            >
              {renderTime(startDate)}
            </Body>
            <Body color="light"
                dark={dark}
                tag="span"
            >
              <Icon
                  className="pb_date_range_inline_arrow"
                  dark={dark}
                  fixedWidth
                  icon="long-arrow-right"
              />
            </Body>
            <Body dark={dark}
                tag="span"
            >
              {renderTime(endDate)}
            </Body>
          </>
        )}
      </div>
    </div>
  );
};

export default DateRangeInline;
