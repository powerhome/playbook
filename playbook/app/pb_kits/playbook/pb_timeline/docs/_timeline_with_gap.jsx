import React from 'react'

import Timeline from '../_timeline'
import Flex from "../../pb_flex/_flex"
import FlexItem from "../../pb_flex/_flex_item"
import Body from '../../pb_body/_body'

const TimelineWithGap = (props) => (
  <div>
    <Flex justify="evenly">
    <FlexItem>
        <Timeline
            itemGap="xs"
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
              lineStyle="dotted"
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
        </Timeline>
      </FlexItem>
      <FlexItem>
        <Timeline
            itemGap="sm"
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
              lineStyle="dotted"
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
        </Timeline>
      </FlexItem>
      <FlexItem>
        <Timeline
            itemGap="md"
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
              lineStyle="dotted"
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
              lineStyle="dotted"
              {...props}
          >
            <Body
                color="light"
                text="Refund issue #12422"
                {...props}
            />
          </Timeline.Item>
        </Timeline>
      </FlexItem>
      <FlexItem>
        <Timeline
            itemGap="lg"
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
              lineStyle="dotted"
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
        </Timeline>
      </FlexItem>
    </Flex>
  </div>
)

export default TimelineWithGap
