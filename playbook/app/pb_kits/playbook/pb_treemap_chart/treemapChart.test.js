/* eslint-disable no-console */

import React from 'react';
import { render, screen } from '../utilities/test-utils';
import TreemapChart from './_treemap_chart';

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

const testId = 'treemapchart1';

test('uses exact classname', () => {
  const data = [
    {
      name: "Pepperoni",
      parent: "Toppings",
      value: 600,
    }, {
      name: "Cheese",
      parent: "Toppings",
      value: 510,
    }, {
      name: "Mushroom",
      parent: "Toppings",
      value: 330,
    },{
      name: "Onions",
      parent: "Toppings",
      value: 250,
    }, {
      name: "Olives",
      parent: "Toppings",
      value: 204,
    }, {
      name: "Pineapple",
      parent: "Toppings",
      value: 90,
    }, {
      name: "Pizza Toppings",
      id: "Toppings",
    },
  ]
  render(
    <TreemapChart
        chartData={data}
        data={{ testid: testId }}
        id="tree-map-id"
    />
  );
 
  const kit = screen.getByTestId(testId);
  expect(kit).toHaveClass('pb_treemap_chart');
});
