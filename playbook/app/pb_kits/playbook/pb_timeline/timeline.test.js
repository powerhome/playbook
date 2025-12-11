import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Timeline from './_timeline'
import TimelineItem from './_item'
import TimelineLabel from './subcomponents/Label'
import TimelineStep from './subcomponents/Step'
import TimelineDetail from './subcomponents/Detail'
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
        <TimelineLabel date={new Date()} />
        <TimelineStep icon="user"
            iconColor="royal"
        />
        <TimelineDetail>
          <TitleDetail
              detail="37-27 74th Street"
              title="Jackson Heights"
              {...props}
          />
        </TimelineDetail>
      </TimelineItem>

      <TimelineItem lineStyle="dotted"
          {...props}
      >
        <TimelineStep icon="check"
            iconColor="teal"
        />
        <TimelineDetail>
          <TitleDetail
              detail="81 Gate St Brooklyn"
              title="Greenpoint"
              {...props}
          />
        </TimelineDetail>
      </TimelineItem>

      <TimelineItem lineStyle="solid"
          {...props}
      >
        <TimelineLabel
            date={new Date(new Date().setDate(new Date().getDate() + 1))}
        />
        <TimelineStep icon="map-marker-alt"
            iconColor="purple"
        />
        <TimelineDetail>
          <TitleDetail
              detail="72 E St Astoria"
              title="Society Hill"
              {...props}
          />
        </TimelineDetail>
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
    expect(kit).toHaveClass('pb_timeline_kit_horizontal')
})

test('should pass vertical orientation', () => {
    const props = { orientation: 'vertical' }
    render(<TimelineDefault {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_timeline_kit_vertical')
})

test('should pass showDate prop', () => {
    const props = { showDate: true }
    render(<TimelineDefault {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_timeline_kit_horizontal_with_date')
})

test('should pass showDate prop with Children', () => {
    const props = { showDate: true }
    render(<TimelineWithChildren {...props} />)
    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass('pb_timeline_kit_horizontal_with_date')
})

test('should pass showCurrentYear prop to items with date', () => {
    const currentYear = new Date().getFullYear().toString()
    render(
        <Timeline
            data={{ testid: testId }}
            showDate
        >
            <Timeline.Item
                date={new Date()}
                icon="user"
                iconColor="royal"
                showCurrentYear
            >
                <TitleDetail
                    detail="37-27 74th Street"
                    title="Jackson Heights"
                />
            </Timeline.Item>
        </Timeline>
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
    const yearCaption = kit.querySelector('.pb_caption_kit_xs')
    expect(yearCaption).toBeInTheDocument()
    expect(yearCaption.textContent).toEqual(currentYear)
})

test('should not show current year by default', () => {
    const currentYear = new Date().getFullYear().toString()
    render(
        <Timeline
            data={{ testid: testId }}
            showDate
        >
            <Timeline.Item
                date={new Date()}
                icon="user"
                iconColor="royal"
            >
                <TitleDetail
                    detail="37-27 74th Street"
                    title="Jackson Heights"
                />
            </Timeline.Item>
        </Timeline>
    )
    const kit = screen.getByTestId(testId)
    expect(kit).toBeInTheDocument()
    expect(kit).not.toHaveTextContent(currentYear)
})
