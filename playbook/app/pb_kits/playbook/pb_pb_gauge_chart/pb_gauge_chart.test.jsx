import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { PbGaugeChart } from 'playbook-ui'

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

const chartOptions = {
  series:[{data:[{ name: "Name", y: 45 }]}]
}

const testId = 'pbgaugechart1'

test('Kit to exist', () => {
  render(
  <PbGaugeChart
      data={{testid: testId}} 
      options={chartOptions} 
  />
)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})
