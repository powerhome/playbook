import React from 'react'
import Timeline from '../_timeline.jsx'
import { Body, TitleDetail } from '../../'

const TimelineDefault = () => (
  <div>
    <Timeline>
      <Timeline.Item
          icon="user"
          iconColor="royal"
      >
        <Body
            color="light"
            text="Conversation started"
        />
      </Timeline.Item>
      <Timeline.Item
          icon="check"
          iconColor="teal"
      >
        <Body
            color="light"
            text="Trip #12422"
        />
      </Timeline.Item>
      <Timeline.Item
          icon="credit-card"
          iconColor="red"
      >
        <Body
            color="light"
            text="Refund issue #12422"
        />
      </Timeline.Item>
      <Timeline.Item
          icon="smile"
          iconColor="green"
      >
        <Body
            color="light"
            text="Conversation resolved"
        />
      </Timeline.Item>
    </Timeline>

    <br />
    <br />

    <Timeline>
      <Timeline.Item
          icon="user"
          iconColor="royal"
          lineStyle="dotted"
      >
        <TitleDetail
            detail="37-27 74th Street"
            title="Jackson heights"
        />
      </Timeline.Item>
      <Timeline.Item
          icon="check"
          iconColor="teal"
      >
        <TitleDetail
            detail="81 Gate St Brooklyn"
            title="Greenpoint"
        />
      </Timeline.Item>
    </Timeline>
  </div>
)

export default TimelineDefault
