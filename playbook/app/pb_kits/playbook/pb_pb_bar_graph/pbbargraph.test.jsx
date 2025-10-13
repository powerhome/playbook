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

const chartData = [{
    name: 'Installation',
    data: [1475, 200, 3000, 654, 656],
  }, {
    name: 'Manufacturing',
    data: [4434, 524, 2320, 440, 500],
  }, {
    name: 'Sales & Distribution',
    data: [3387, 743, 1344, 434, 440],
  }, {
    name: 'Project Development',
    data: [3227, 878, 999, 780, 1000],
  }, {
    name: 'Other',
    data: [1111, 677, 3245, 500, 200],
  }]

  const chartOptions = {
    series: chartData,
    title: {
      text: 'Solar Employment Growth by Sector, 2010-2016',
    },
    subtitle: {
      text: 'Source: thesolarfoundation.com',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    },
    yAxis: {
      title: {
        text: 'Number of Employees',
      },
    },
  }

const testId = 'bargraph1';

test('bargraph uses exact classname', () => {
  render(
    <PbBarGraph
        className='super_important_class'
        data={{ testid: testId }}
        id='bar-default'
        options={chartOptions}
    />
  );
 
  const kit = screen.getByTestId(testId);
  expect(kit).toHaveClass('super_important_class');
});

test('Kit to apply base classname', () => {
  render(
    <PbBarGraph
        data={{testid: testId}} 
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveClass('pb_pb_bar_graph')
})


test('Kit to apply global props', () => {
  render(
    <PbBarGraph
        data={{testid: testId}} 
        margin="lg"
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveClass('m_lg')
})

test('kit to apply id', () => {
  render(
    <PbBarGraph
        data={{testid: testId}} 
        id='bar-graph-id'
        options={chartOptions} 
    />
  )

  expect(screen.getByTestId(testId)).toHaveAttribute('id', 'bar-graph-id')
})