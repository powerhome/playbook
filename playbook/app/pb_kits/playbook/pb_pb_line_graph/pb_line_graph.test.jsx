import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { PbLineGraph } from 'playbook-ui'

beforeEach(() => {
  // Silences error logs within the test suite.
  jest.spyOn(console, 'error');
  jest.spyOn(console, 'warn');
  console.error.mockImplementation(() => {});
  console.warn.mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
  console.warn.mockRestore();
});

const seriesData = [{
  name: 'Installation',
  data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
}, {
  name: 'Manufacturing',
  data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
}, {
  name: 'Sales & Distribution',
  data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
}, {
  name: 'Project Development',
  data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
}, {
  name: 'Other',
  data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
}]

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const chartOptions = {
  series: seriesData,
  title: { text: "Solar Employment Growth by Sector, 2010-2016" },
  subtitle: { text: "Source: thesolarfoundation.com" },
  xAxis: {
    categories: categories,
  },
  yAxis: {
    title: {
      text: "Number of Employees",
    },
  },
}

const testId = 'pblinegraph1';

test('Kit to exist', () => {
  render(
  <PbLineGraph 
      data={{testid: testId}} 
      options={chartOptions} 
  />
)

  expect(screen.getByTestId(testId)).toBeInTheDocument()
})
