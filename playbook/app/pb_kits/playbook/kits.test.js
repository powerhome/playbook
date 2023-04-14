import React from 'react'
import { render } from './utilities/test-utils'

import * as index from './kits'

Object.keys(index).forEach((key) => {
  const Component = index[key];

  test(`${key} should have correct classname position`, () => {
    render(
      <Component
          data={{ testid: 'my-unique-id' }}
      />
    )
    console.log(`PropType ${key}`);

    // const element = screen.getByTestId('my-unique-id');
    // expect(element).toBeInTheDocument();

  })
});
