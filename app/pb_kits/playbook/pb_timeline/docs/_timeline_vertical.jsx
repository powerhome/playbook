import React from 'react'
import Timeline from '../_timeline.jsx'
import TimelineItem from '../_timeline_item.jsx'
import { Body, TitleDetail } from '../../'

const TimelineVertical = () => (
  <div>
    <Timeline orientation="vertical">
      <TimelineItem
          icon="user"
          iconColor="royal"
      >
        <Body
            color="light"
            text="Conversation started"
        />
      </TimelineItem>
      <TimelineItem
          icon="check"
          iconColor="teal"
      >
        <Body
            color="light"
            text="Trip #12422"
        />
      </TimelineItem>
      <TimelineItem
          icon="credit-card"
          iconColor="red"
      >
        <Body
            color="light"
            text="Refund issue #12422"
        />
      </TimelineItem>
      <TimelineItem
          icon="smile"
          iconColor="green"
      >
        <Body
            color="light"
            text="Conversation resolved"
        />
      </TimelineItem>
    </Timeline>

    <br />
    <br />

    <Timeline orientation="vertical">
      <TimelineItem
          icon="user"
          iconColor="royal"
          lineStyle="dotted"
      >
        <TitleDetail
            detail="37-27 74th Street"
            title="Jackson heights"
        />
      </TimelineItem>
      <TimelineItem
          icon="check"
          iconColor="teal"
      >
        <TitleDetail
            detail="81 Gate St Brooklyn"
            title="Greenpoint"
        />
      </TimelineItem>
    </Timeline>
  </div>
)

export default TimelineVertical
