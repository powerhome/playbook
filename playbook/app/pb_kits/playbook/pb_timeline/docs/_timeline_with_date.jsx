import React from 'react'

import Timeline from '../_timeline'
import TitleDetail from '../../pb_title_detail/_title_detail'

const TimelineWithDate = (props) => (
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
          date={new Date().setDate(new Date().getDate() + 1)}
          icon="map-marker-alt"
          iconColor="purple"
          {...props}
      >
        <TitleDetail
            detail="72 E St Astoria"
            title="Society Hill"
            {...props}
        />
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
          date={new Date().setDate(new Date().getDate() + 1)}
          icon="map-marker-alt"
          iconColor="purple"
          {...props}
      >
        <TitleDetail
            detail="72 E St Astoria"
            title="Society Hill"
            {...props}
        />
      </Timeline.Item>
    </Timeline>

    <br/>
    <br/>
    <br/>

    <Timeline
        orientation="vertical"
        showDate
        {...props}
    >
      <Timeline.Item
          date={new Date('20 Mar 2018')}
          icon="user"
          iconColor="royal"
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
          date={new Date('20 May 2018')}
          icon="map-marker-alt"
          iconColor="purple"
          {...props}
      >
        <TitleDetail
            detail="72 E St Astoria"
            title="Society Hill"
            {...props}
        />
      </Timeline.Item>
    </Timeline>
  </div>
)

export default TimelineWithDate
