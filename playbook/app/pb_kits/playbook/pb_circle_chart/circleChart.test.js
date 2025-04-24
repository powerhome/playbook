import React from 'react';
import { render, screen } from '../utilities/test-utils';
import CircleChart from './_circle_chart';

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

const testId = 'circlechart1';

test('uses exact classname', () => {
  const data = [
    {
      name: 'Waiting for Calls',
      value: 41,
    },
    {
      name: 'On Call',
      value: 49,
    },
    {
      name: 'After Call',
      value: 10,
    },
  ]
  render(
    <CircleChart
        chartData={data}
        data={{ testid: testId }}
        id='circlechartid'
    />
  );

  const kit = screen.getByTestId(testId);
  expect(kit).toHaveClass('pb_circle_chart');
});
