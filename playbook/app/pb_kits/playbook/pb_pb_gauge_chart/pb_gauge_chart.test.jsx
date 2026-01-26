import React from 'react'
import { render, screen } from '../utilities/test-utils'

import PbGaugeChart from './_pb_gauge_chart'

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

test('Kit to apply base classname', () => {
  render(
    <PbGaugeChart
        data={{testid: testId}} 
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveClass('pb_pb_gauge_chart')
})

test('Kit to have custom class', () => {
  render(
    <PbGaugeChart
        className='custom-class'
        data={{testid: testId}} 
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveClass('custom-class')
})

test('Kit to apply global props', () => {
  render(
    <PbGaugeChart
        data={{testid: testId}} 
        margin="lg"
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveClass('m_lg')
})

test('kit to apply id', () => {
  render(
    <PbGaugeChart
        data={{testid: testId}} 
        id='gauge-chart-id'
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveAttribute('id', 'gauge-chart-id')
})
