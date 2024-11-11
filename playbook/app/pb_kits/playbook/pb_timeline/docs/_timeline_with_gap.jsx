import React from 'react'

import Timeline from '../_timeline'
import Body from '../../pb_body/_body'

const TimelineWithGap = (props) => (
  <div>
    <Timeline
        gap="lg"
        orientation="vertical"
    >
      <Timeline.Item
          icon="user"
          iconColor="royal"
          {...props}
      >
        <Body
            color="light"
            text="Conversation started"
            {...props}
        />
      </Timeline.Item>
      <Timeline.Item
          icon="check"
          iconColor="teal"
          {...props}
      >
        <Body
            color="light"
            text="Trip #12422"
            {...props}
        />
      </Timeline.Item>
      <Timeline.Item
          icon="credit-card"
          iconColor="red"
          {...props}
      >
        <Body
            color="light"
            text="Refund issue #12422"
            {...props}
        />
      </Timeline.Item>
      <Timeline.Item
          icon="smile"
          iconColor="green"
          {...props}
      >
        <Body
            color="light"
            text="Conversation resolved"
            {...props}
        />
      </Timeline.Item>
    </Timeline>
  </div>
)

export default TimelineWithGap
