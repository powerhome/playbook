import React from 'react'

import Timeline from '../_timeline'
import TimelineItem from '../_item'
import TimelineDateArea from '../_date_area'
import TimelineNodeArea from '../_node_area'
import TimelineDetailArea from '../_detail_area'

import TitleDetail from '../../pb_title_detail/_title_detail'

const TimelineWithDate = (props) => (
  <div>
    {/* Horizontal Timeline */}
    <Timeline orientation="horizontal"
        showDate
        {...props}
    >
      <TimelineItem lineStyle="solid"
          {...props}
      >
        <TimelineDateArea date={new Date()} />
        <TimelineNodeArea icon="user"
            iconColor="royal"
        />
        <TimelineDetailArea>
          <TitleDetail detail="37-27 74th Street"
              title="Jackson Heights"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>

      <TimelineItem lineStyle="dotted"
          {...props}
      >
        <TimelineNodeArea icon="check"
            iconColor="teal"
        />
        <TimelineDetailArea>
          <TitleDetail detail="81 Gate St Brooklyn"
              title="Greenpoint"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>

      <TimelineItem lineStyle="solid"
          {...props}
      >
        <TimelineDateArea date={new Date(new Date().setDate(new Date().getDate() + 1))} />
        <TimelineNodeArea icon="map-marker-alt"
            iconColor="purple"
        />
        <TimelineDetailArea>
          <TitleDetail detail="72 E St Astoria"
              title="Society Hill"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>
    </Timeline>

    <br />
    <br />
    <br />

    {/* Vertical Timeline */}
    <Timeline orientation="vertical"
        showDate
        {...props}
    >
      <TimelineItem lineStyle="solid"
          {...props}
      >
        <TimelineDateArea date={new Date()} />
        <TimelineNodeArea icon="user"
            iconColor="royal"
        />
        <TimelineDetailArea>
          <TitleDetail detail="37-27 74th Street"
              title="Jackson Heights"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>

      <TimelineItem lineStyle="dotted"
          {...props}
      >
        <TimelineNodeArea icon="check"
            iconColor="teal"
        />
        <TimelineDetailArea>
          <TitleDetail detail="81 Gate St Brooklyn"
              title="Greenpoint"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>

      <TimelineItem lineStyle="solid"
          {...props}
      >
        <TimelineDateArea date={new Date(new Date().setDate(new Date().getDate() + 1))} />
        <TimelineNodeArea icon="map-marker-alt"
            iconColor="purple"
        />
        <TimelineDetailArea>
          <TitleDetail detail="72 E St Astoria"
              title="Society Hill"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>
    </Timeline>

    <br />
    <br />
    <br />

    {/* Vertical Timeline with Fixed Dates */}
    <Timeline orientation="vertical"
        showDate
        {...props}
    >
      <TimelineItem lineStyle="solid"
          {...props}
      >
        <TimelineDateArea date={new Date('2018-03-20')} />
        <TimelineNodeArea icon="user"
            iconColor="royal"
        />
        <TimelineDetailArea>
          <TitleDetail detail="37-27 74th Street"
              title="Jackson Heights"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>

      <TimelineItem lineStyle="dotted"
          {...props}
      >
        <TimelineNodeArea icon="check"
            iconColor="teal"
        />
        <TimelineDetailArea>
          <TitleDetail detail="81 Gate St Brooklyn"
              title="Greenpoint"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>

      <TimelineItem lineStyle="solid"
          {...props}
      >
        <TimelineDateArea date={new Date('2018-05-20')} />
        <TimelineNodeArea icon="map-marker-alt"
            iconColor="purple"
        />
        <TimelineDetailArea>
          <TitleDetail detail="72 E St Astoria"
              title="Society Hill"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>
    </Timeline>
  </div>
)

export default TimelineWithDate
