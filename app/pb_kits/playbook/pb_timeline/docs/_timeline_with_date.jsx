import React from 'react'
import Timeline from '../_timeline.jsx'
import { TitleDetail } from '../../'

const TimelineWithDate = () => (
  <div>
    <Timeline
        orientation="horizontal"
        showDate
    >
      <Timeline.Item
          date={new Date()}
          icon="user"
          iconColor="royal"
      >
        <TitleDetail
            detail="37-27 74th Street"
            title="Jackson heights"
        />
      </Timeline.Item>
      <Timeline.Item
          icon="check"
          iconColor="teal"
          lineStyle="dotted"
      >
        <TitleDetail
            detail="81 Gate St Brooklyn"
            title="Greenpoint"
        />
      </Timeline.Item>
      <Timeline.Item
          date={new Date().setDate(new Date().getDate() + 1)}
          icon="map-marker-alt"
          iconColor="purple"
      >
        <TitleDetail
            detail="72 E St Astoria"
            title="Society Hill"
        />
      </Timeline.Item>
    </Timeline>

    <br />
    <br />
    <br />

    <Timeline
        orientation="vertical"
        showDate
    >
      <Timeline.Item
          date={new Date()}
          icon="user"
          iconColor="royal"
      >
        <TitleDetail
            detail="37-27 74th Street"
            title="Jackson heights"
        />
      </Timeline.Item>
      <Timeline.Item
          icon="check"
          iconColor="teal"
          lineStyle="dotted"
      >
        <TitleDetail
            detail="81 Gate St Brooklyn"
            title="Greenpoint"
        />
      </Timeline.Item>
      <Timeline.Item
          date={new Date().setDate(new Date().getDate() + 1)}
          icon="map-marker-alt"
          iconColor="purple"
      >
        <TitleDetail
            detail="72 E St Astoria"
            title="Society Hill"
        />
      </Timeline.Item>
    </Timeline>
  </div>
)

export default TimelineWithDate
