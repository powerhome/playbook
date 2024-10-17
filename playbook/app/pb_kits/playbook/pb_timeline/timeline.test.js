import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Timeline from './_timeline'
import TimelineItem from './_item'
import TimelineDateArea from './_date_area'
import TimelineNodeArea from './_node_area'
import TimelineDetailArea from './_detail_area'
import TitleDetail from '../pb_title_detail/_title_detail'

const testId = 'timeline'
const className = 'custom-class-name'

const TimelineDefault = (props) => (
    <>
        <Timeline
            aria={{ label: testId }}
            className={className}
            data={{ testid: testId }}
            id={testId}
            {...props}
        >
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
    </>
)

const TimelineWithChildren = (props) => (
  <>
    <Timeline
        className={className}
        data={{ testid: testId }}
        orientation="horizontal"
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
          <TitleDetail
              detail="37-27 74th Street"
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
          <TitleDetail
              detail="81 Gate St Brooklyn"
              title="Greenpoint"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>

      <TimelineItem lineStyle="solid"
          {...props}
      >
        <TimelineDateArea
            date={new Date(new Date().setDate(new Date().getDate() + 1))}
        />
        <TimelineNodeArea icon="map-marker-alt"
            iconColor="purple"
        />
        <TimelineDetailArea>
          <TitleDetail
              detail="72 E St Astoria"
              title="Society Hill"
              {...props}
          />
        </TimelineDetailArea>
      </TimelineItem>
    </Timeline>
  </>
)

test('should pass data prop', () => {
    render(<TimelineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test('should pass data prop using children', () => {
    render(<TimelineWithChildren />)
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
})

test('should pass className prop', () => {
    render(<TimelineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass className prop with children', () => {
    render(<TimelineWithChildren />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(className)
})

test('should pass aria prop', () => {
    render(<TimelineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveAttribute('aria-label', testId)
})

test('should pass id prop', () => {
    render(<TimelineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveProperty('id', testId)
})

test('should have horizontal orientation by default', () => {
    render(<TimelineDefault />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_timeline_kit__horizontal')
})

test('should pass vertical orientation', () => {
    const props = { orientation: 'vertical' }
    render(<TimelineDefault {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_timeline_kit__vertical')
})

test('should pass showDate prop', () => {
    const props = { showDate: true }
    render(<TimelineDefault {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_timeline_kit__horizontal__with_date')
})

test('should pass showDate prop with Children', () => {
    const props = { showDate: true }
    render(<TimelineWithChildren {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_timeline_kit__horizontal__with_date')
})
