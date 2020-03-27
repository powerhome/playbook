import React from 'react'
import { TimeRangeInline } from '../../'

const TimeRangeInlineDark = () => (
  <div>
    <TimeRangeInline
        dark
        endTime="2012-08-02T17:49:29Z"
        size="xs"
        startTime="2012-08-02T15:49:29Z"
    />
    <br />
    <TimeRangeInline
        dark
        endTime="2012-08-02T17:49:29Z"
        size="sm"
        startTime="2012-08-02T15:49:29Z"
    />
    <br />
    <br />
    <TimeRangeInline
        alignment="center"
        dark
        endTime="2012-08-02T17:49:29Z"
        size="xs"
        startTime="2012-08-02T15:49:29Z"
        timezone="true"
    />
    <br />
    <TimeRangeInline
        alignment="center"
        dark
        endTime="2012-08-02T17:49:29Z"
        size="sm"
        startTime="2012-08-02T15:49:29Z"
        timezone="true"
    />
    <br />
    <br />
    <TimeRangeInline
        alignment="center"
        dark
        endTime="2012-08-02T17:49:29Z"
        icon="true"
        size="xs"
        startTime="2012-08-02T15:49:29Z"
    />
    <br />
    <TimeRangeInline
        alignment="center"
        dark
        endTime="2012-08-02T17:49:29Z"
        icon="true"
        size="sm"
        startTime="2012-08-02T15:49:29Z"
    />
    <br />
    <br />
    <TimeRangeInline
        alignment="right"
        dark
        endTime="2012-08-02T17:49:29Z"
        icon="true"
        size="xs"
        startTime="2012-08-02T15:49:29Z"
        timezone="true"
    />
    <br />
    <TimeRangeInline
        alignment="right"
        dark
        endTime="2012-08-02T17:49:29Z"
        icon="true"
        size="sm"
        startTime="2012-08-02T15:49:29Z"
        timezone="true"
    />
  </div>
)

export default TimeRangeInlineDark
