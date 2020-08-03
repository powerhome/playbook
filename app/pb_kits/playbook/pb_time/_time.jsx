/* @flow */

import React from "react";
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

import { Title } from "../";

type TimeStackedProps = {
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  id?: String,
  align?: "left" | "center" | "right",
  // tag?: "body" | "caption",
}

const Time = (props: TimeStackedProps) => {
  
  
    const { className, dark = false, date, tag = "body" } = props;
    const classes = classnames(
      className,
      buildCss("pb_time_stacked_kit", {
        dark: dark,
      }),
      spacing(props)
    );

    const dateTimestamp = new DateTime({ value: date });
    
    return (
      <div className={classes}>
        <div className="pb_time">
          <Title tag="span" size={3} text={dateTimestamp.toTimeWithMeridian()} color="light" />
          <span className="pb_time_timezone">{dateTimestamp.toTimezone()}</span>
        </div>
      </div>
    );
}

export default Time;
