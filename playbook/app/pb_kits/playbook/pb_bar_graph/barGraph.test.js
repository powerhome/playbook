import React from 'react'
import { render, screen } from '../utilities/test-utils'

import BarGraph from './_bar_graph' 

beforeEach(() => {
  // Silences error logs within the test suite.
  jest.spyOn(console, 'error')
  // eslint-disable-next-line
  console.error.mockImplementation(() => {})
})

afterEach(() => {
  // eslint-disable-next-line
  console.error.mockRestore()
})

const testId = 'bargraph1'

test('bargraph uses exact classname provided', () => {
  render(
    <BarGraph
        className='super_important_class'
        data={{ testid: testId }}
    />
  )
  
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass("super_important_class")
})

test('bargraph has right html structure', () => {
  render(
    <BarGraph
        data={{ testid: testId }}
    />
  )
  
  const kit = screen.getByTestId(testId)
  const normalizeHTML = (html) => html.replace(/\s+/g, '').trim();
  const removeDynamicIds = (html) => html.replace(/id="highcharts-[^"]+"/g, '').replace(/clipPath id="highcharts-[^"]+"/g, 'clipPath');
  const expectedHTML = `
    <div class="pb_bar_graph" data-testid="bargraph1" data-highcharts-chart="1" style="overflow: hidden;">
      <div id="highcharts-qb5a0xb-2" style="position: relative; overflow: hidden; width: 600px; height: 400px; text-align: left; line-height: normal; z-index: 0; user-select: none; outline: none;" dir="ltr" class="highcharts-container ">
        <svg version="1.1" class="highcharts-root" style="font-family:&quot;Lucida Grande&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, sans-serif;font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
          <desc>Created with Highcharts 9.3.3</desc>
          <defs>
            <clipPath id="highcharts-qb5a0xb-3-">
              <rect x="0" y="0" width="580" height="375" fill="none"></rect>
            </clipPath>
          </defs>
          <rect fill="#ffffff" class="highcharts-background" x="0" y="0" width="600" height="400" rx="0" ry="0"></rect>
          <rect fill="none" class="highcharts-plot-background" x="10" y="10" width="580" height="375"></rect>
          <rect fill="none" class="highcharts-plot-border" data-z-index="1" x="10" y="10" width="580" height="375"></rect>
          <g class="highcharts-series-group" data-z-index="3"></g>
          <text x="10" text-anchor="start" class="highcharts-caption" data-z-index="4" style="color:#666666;fill:#666666;" y="397"></text>
          <text x="300" text-anchor="middle" class="highcharts-title" data-z-index="4" style="color:text_lt_default;font-size:heading_3;font-family:font_family_base;font-weight:regular;fill:text_lt_default;" y="19">Title</text>
          <text x="300" text-anchor="middle" class="highcharts-subtitle" data-z-index="4" style="color:text_lt_light;font-family:font_family_base;font-weight:regular;font-size:text_base;fill:text_lt_light;" y="10"></text>
        </svg>
      </div>
    </div>
  `;
  const normalizedActualHTML = normalizeHTML(removeDynamicIds(kit.outerHTML));
  const normalizedExpectedHTML = normalizeHTML(removeDynamicIds(expectedHTML));
  // Normalize and compare the HTML
  expect(normalizedActualHTML).toEqual(normalizedExpectedHTML);
});
