import React from 'react'
import TimeRangeInline from '../../pb_time_range_inline/_time_range_inline'

const TimeRangeInlineDefault = (props) => (
  <div>
    <TimeRangeInline
        endTime="2012-08-02T17:49:29Z"
        size="xs"
        startTime="2012-08-02T15:49:29Z"
        {...props}
    />
    <br />
    <TimeRangeInline
        endTime="2012-08-02T17:49:29Z"
        size="sm"
        startTime="2012-08-02T15:49:29Z"
        {...props}
    />
    <br />
    <br />
    <TimeRangeInline
        alignment="center"
        endTime="2012-08-02T17:49:29Z"
        size="xs"
        startTime="2012-08-02T15:49:29Z"
        timezone="true"
        {...props}
    />
    <br />
    <TimeRangeInline
        alignment="center"
        endTime="2012-08-02T17:49:29Z"
        size="sm"
        startTime="2012-08-02T15:49:29Z"
        timezone="true"
        {...props}
    />
    <br />
    <br />
    <TimeRangeInline
        alignment="center"
        endTime="2012-08-02T17:49:29Z"
        icon="true"
        size="xs"
        startTime="2012-08-02T15:49:29Z"
        {...props}
    />
    <br />
    <TimeRangeInline
        alignment="center"
        endTime="2012-08-02T17:49:29Z"
        icon="true"
        size="sm"
        startTime="2012-08-02T15:49:29Z"
        {...props}
    />
    <br />
    <br />
    <TimeRangeInline
        alignment="right"
        endTime="2012-08-02T17:49:29Z"
        icon="true"
        size="xs"
        startTime="2012-08-02T15:49:29Z"
        timezone="true"
        {...props}
    />
    <br />
    <TimeRangeInline
        alignment="right"
        endTime="2012-08-02T17:49:29Z"
        icon="true"
        size="sm"
        startTime="2012-08-02T15:49:29Z"
        timezone="true"
        {...props}
    />
  </div>
)

export default TimeRangeInlineDefault
