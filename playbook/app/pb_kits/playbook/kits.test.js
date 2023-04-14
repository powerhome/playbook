import React from 'react'
import { render, screen } from './utilities/test-utils'

import * as index from './index'

Object.keys(index).forEach((key) => {
  const Component = index[key];
  console.log(key);

  test(`test mee ${key}`, () => {
    render(
      <Component
          data={{ testid: 'my-unique-id' }}
      />
    )

    const element = screen.getByTestId('my-unique-id');
    expect(element).toBeInTheDocument();
  })
});
