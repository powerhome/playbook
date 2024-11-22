import React from 'react'

import Timeline from '../_timeline'
import Title from '../../pb_title/_title'
import Pill from '../../pb_pill/_pill'

import TitleDetail from '../../pb_title_detail/_title_detail'

const TimelineWithChildren = (props) => (
  <div>
    <Timeline orientation="horizontal"
        showDate
        {...props}
    >
      <Timeline.Item lineStyle="solid"
          {...props}
      >
        <Timeline.Label>
          <Title size={2}
              text='Any Kit Here'
          />
        </Timeline.Label>
        <Timeline.Step icon="user"
            iconColor="royal"
        />
        <Timeline.Detail>
          <TitleDetail detail="37-27 74th Street"
              title="Jackson Heights"
              {...props}
          />
        </Timeline.Detail>
      </Timeline.Item>

      <Timeline.Item lineStyle="dotted"
          {...props}
      >
        <Timeline.Step>
          <Pill text="Any Kit"
              variant="success"
          />
        </Timeline.Step>
        <Timeline.Detail>
          <TitleDetail detail="81 Gate St Brooklyn"
              title="Greenpoint"
              {...props}
          />
        </Timeline.Detail>
      </Timeline.Item>

      <Timeline.Item lineStyle="solid"
          {...props}
      >
        <Timeline.Label date={new Date(new Date().setDate(new Date().getDate() + 1))} />
        <Timeline.Step icon="map-marker-alt"
            iconColor="purple"
        />
        <Timeline.Detail>
          <TitleDetail detail="72 E St Astoria"
              title="Society Hill"
              {...props}
          />
        </Timeline.Detail>
      </Timeline.Item>
    </Timeline>

    <br />
    <br />
    <br />

    <Timeline orientation="vertical"
        showDate
        {...props}
    >
      <Timeline.Item lineStyle="solid"
          {...props}
      >
        <Timeline.Label>
          <Title size={4}
              text='Any Kit'
          />
        </Timeline.Label>
        <Timeline.Step icon="user"
            iconColor="royal"
        />
        <Timeline.Detail>
          <TitleDetail detail="37-27 74th Street"
              title="Jackson Heights"
              {...props}
          />
        </Timeline.Detail>
      </Timeline.Item>

      <Timeline.Item lineStyle="dotted"
          {...props}
      >
        <Timeline.Label date={new Date(new Date().setDate(new Date().getDate() + 1))} />
        <Timeline.Step icon="map-marker-alt"
            iconColor="purple"
        />
        <Timeline.Detail>
          <TitleDetail detail="72 E St Astoria"
              title="Society Hill"
              {...props}
          />
        </Timeline.Detail>
      </Timeline.Item>

      <Timeline.Item lineStyle="solid"
          {...props}
      >
        <Timeline.Step>
          <Pill text="3"
              variant="success"
          />
        </Timeline.Step>
        <Timeline.Detail>
          <TitleDetail detail="81 Gate St Brooklyn"
              title="Greenpoint"
              {...props}
          />
        </Timeline.Detail>
      </Timeline.Item>
    </Timeline>
  </div>
)

export default TimelineWithChildren
