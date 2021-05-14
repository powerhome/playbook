import React from 'react'

import Timeline from '../_timeline'
import Body from '../../pb_body/_body'
import TitleDetail from '../../pb_title_detail/_title_detail'

const TimelineDefault = (props) => (
  <div>
    <Timeline>
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

    <br />
    <br />

    <Timeline>
      <Timeline.Item
          icon="user"
          iconColor="royal"
          lineStyle="dotted"
          {...props}
      >
        <TitleDetail
            detail="37-27 74th Street"
            title="Jackson heights"
            {...props}
        />
      </Timeline.Item>
      <Timeline.Item
          icon="check"
          iconColor="teal"
          {...props}
      >
        <TitleDetail
            detail="81 Gate St Brooklyn"
            title="Greenpoint"
            {...props}
        />
      </Timeline.Item>
    </Timeline>
  </div>
)

export default TimelineDefault
