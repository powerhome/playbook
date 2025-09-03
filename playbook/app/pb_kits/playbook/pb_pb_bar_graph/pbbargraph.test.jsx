import React from 'react';
import { render, screen } from '../utilities/test-utils';
import PbBarGraph from './_pb_bar_graph';

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

const testId = 'bargraph1';

test('bargraph uses exact classname', () => {
  render(
    <PbBarGraph
        className='super_important_class'
        data={{ testid: testId }}
        id='bar-default'
    />
  );
 
  const kit = screen.getByTestId(testId);
  expect(kit).toHaveClass('super_important_class');
});