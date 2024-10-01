import React from 'react';
import { render, screen } from '../utilities/test-utils';
import Gauge from './_gauge';

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

const testId = 'gauge1';

test.skip('uses exact classname', () => {
  const data = [
    { name: 'Name', value: 45 },
  ]
  render(
    <Gauge
        chartData={data}
        data={{ testid: testId }}
        id='gaugeid'
    />
  );
 
  const kit = screen.getByTestId(testId);
  expect(kit).toHaveClass('pb_gauge_kit');
});

