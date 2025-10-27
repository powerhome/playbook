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

test('Kit to apply base classname', () => {
  render(
    <PbCircleChart
        data={{testid: testId}} 
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveClass('pb_pb_circle_chart')
})

test('Kit to have custom class', () => {
  render(
    <PbCircleChart
        className='custom-class'
        data={{testid: testId}} 
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveClass('custom-class')
})

test('Kit to apply global props', () => {
  render(
    <PbCircleChart
        data={{testid: testId}} 
        margin="lg"
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveClass('m_lg')
})

test('kit to apply id', () => {
  render(
    <PbCircleChart
        data={{testid: testId}} 
        id='circle-chart-id'
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveAttribute('id', 'circle-chart-id')
})

