import React from 'react'
import { render, screen } from '../utilities/test-utils'

import { PbCircleChart } from 'playbook-ui'

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
  series: [
    {
      data: [
        {
          name: "Waiting for Calls",
          y: 41,
        },
        {
          name: "On Call",
          y: 49,
        },
        {
          name: "After Call",
          y: 10,
        },
      ],
    },
  ],
};

const testId = 'pbcirclechart1';

test('Kit to exist', () => {
  render(
  <PbCircleChart 
      data={{testid: testId}} 
      options={chartOptions} 
  />
)
  expect(screen.getByTestId(testId)).toBeInTheDocument()
})

