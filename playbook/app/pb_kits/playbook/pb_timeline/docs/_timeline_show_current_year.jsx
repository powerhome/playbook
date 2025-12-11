import React from 'react'

import Timeline from '../_timeline'
import TitleDetail from '../../pb_title_detail/_title_detail'

const TimelineShowCurrentYear = (props) => (
  <div>
    <Timeline
        orientation="horizontal"
        showDate
        {...props}
    >
      <Timeline.Item
          date={new Date()}
          icon="user"
          iconColor="royal"
          showCurrentYear
          {...props}
      >
        <TitleDetail
            detail="37-27 74th Street"
            title="Jackson Heights"
            {...props}
        />
      </Timeline.Item>
      <Timeline.Item
          icon="check"
          iconColor="teal"
          lineStyle="dotted"
          {...props}
      >
        <TitleDetail
            detail="81 Gate St Brooklyn"
            title="Greenpoint"
            {...props}
        />
      </Timeline.Item>
      <Timeline.Item
          lineStyle="solid"
          {...props}
      >
        <Timeline.Label
            date={new Date()}
            showCurrentYear
        />
        <Timeline.Step
            icon="map-marker-alt"
            iconColor="purple"
        />
        <Timeline.Detail>
          <TitleDetail
              detail="72 E St Astoria"
              title="Society Hill"
              {...props}
          />
        </Timeline.Detail>
      </Timeline.Item>
    </Timeline>

    <br />
    <br />
    <br />

    <Timeline
        orientation="vertical"
        showDate
        {...props}
    >
      <Timeline.Item
          date={new Date()}
          icon="user"
          iconColor="royal"
          showCurrentYear
          {...props}
      >
        <TitleDetail
            detail="37-27 74th Street"
            title="Jackson Heights"
            {...props}
        />
      </Timeline.Item>
      <Timeline.Item
          icon="check"
          iconColor="teal"
          lineStyle="dotted"
          {...props}
      >
        <TitleDetail
            detail="81 Gate St Brooklyn"
            title="Greenpoint"
            {...props}
        />
      </Timeline.Item>
      <Timeline.Item
          lineStyle="solid"
          {...props}
      >
        <Timeline.Label
            date={new Date()}
            showCurrentYear
        />
        <Timeline.Step
            icon="map-marker-alt"
            iconColor="purple"
        />
        <Timeline.Detail>
          <TitleDetail
              detail="72 E St Astoria"
              title="Society Hill"
              {...props}
          />
        </Timeline.Detail>
      </Timeline.Item>
    </Timeline>
  </div>
)

export default TimelineShowCurrentYear
