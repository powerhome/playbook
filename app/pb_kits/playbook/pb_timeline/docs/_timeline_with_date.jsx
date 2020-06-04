import React from 'react'
import Timeline from '../_timeline.jsx'
import TimelineItem from '../_timeline_item.jsx'
import { TitleDetail } from '../../'

const TimelineWithDate = () => (
  <div>
    <Timeline orientation="horizontal">
      <TimelineItem
          date={new Date('20 Mar 2018')}
          icon="user"
          iconColor="royal"
      >
        <TitleDetail
            detail="37-27 74th Street"
            title="Jackson heights"
        />
      </TimelineItem>
      <TimelineItem
          date={new Date('21 Mar 2018')}
          icon="check"
          iconColor="teal"
          lineStyle="dotted"
      >
        <TitleDetail
            detail="81 Gate St Brooklyn"
            title="Greenpoint"
        />
      </TimelineItem>
      <TimelineItem
          date={new Date('22 Mar 2018')}
          icon="map-marker-alt"
          iconColor="purple"
      >
        <TitleDetail
            detail="72 E St Astoria"
            title="Society Hill"
        />
      </TimelineItem>
    </Timeline>

    <br />
    <br />
    <br />

    <Timeline orientation="vertical">
      <TimelineItem
          date={new Date('20 Mar 2018')}
          icon="user"
          iconColor="royal"
      >
        <TitleDetail
            detail="37-27 74th Street"
            title="Jackson heights"
        />
      </TimelineItem>
      <TimelineItem
          date={new Date('21 Mar 2018')}
          icon="check"
          iconColor="teal"
          lineStyle="dotted"
      >
        <TitleDetail
            detail="81 Gate St Brooklyn"
            title="Greenpoint"
        />
      </TimelineItem>
      <TimelineItem
          date={new Date('22 Mar 2018')}
          icon="map-marker-alt"
          iconColor="purple"
      >
        <TitleDetail
            detail="72 E St Astoria"
            title="Society Hill"
        />
      </TimelineItem>
    </Timeline>
  </div>
)

export default TimelineWithDate
