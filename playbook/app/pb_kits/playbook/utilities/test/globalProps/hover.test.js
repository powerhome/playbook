import React from 'react';
import { render, screen } from '../../test-utils';
import Body from '../../../pb_body/_body';

const testSubject = 'body';

test('Hover Props: returns proper class name', () => {
  const testIdColor = `${testSubject}-hover-color-red`;
  render(
    <Body
        data={{ testid: testIdColor }}
        hover={{ color: 'red' }}
        text="Hi"
    />
  );

  let kit = screen.getByTestId(testIdColor);
  let expectedClassName = `hover_color-red`;
  expect(kit).toHaveClass(expectedClassName);

  const testIdBackground = `${testSubject}-hover-background-blue`;
  render(
    <Body
        data={{ testid: testIdBackground }}
        hover={{ background: 'blue' }}
        text="Hi"
    />
  );

  kit = screen.getByTestId(testIdBackground);
  expectedClassName = `hover_background-blue`;
  expect(kit).toHaveClass(expectedClassName);

  const testIdShadow = `${testSubject}-hover-shadow-deep`;
  render(
    <Body
        data={{ testid: testIdShadow }}
        hover={{ shadow: 'deep' }}
        text="Hi"
    />
  );

  kit = screen.getByTestId(testIdShadow);
  expectedClassName = `hover_shadow_deep`;
  expect(kit).toHaveClass(expectedClassName);

  const testIdScale = `${testSubject}-hover-scale`;
  render(
    <Body
        data={{ testid: testIdScale }}
        hover={{ scale: 'xl' }}
        text="Test"
    />
  );

  kit = screen.getByTestId(testIdScale);
  expectedClassName = `hover_scale_xl`;
  expect(kit).toHaveClass(expectedClassName);

  const testIdMultiple = `${testSubject}-hover-multiple`;
  render(
    <Body
        data={{ testid: testIdMultiple }}
        hover={{
        color: 'green',
        background: 'error',
        shadow: 'deeper',
        scale: 'xl',
      }}
        text="Hi"
    />
  );

  kit = screen.getByTestId(testIdMultiple);
  expect(kit).toHaveClass('hover_color-green');
  expect(kit).toHaveClass('hover_background-error');
  expect(kit).toHaveClass('hover_shadow_deeper');
  expect(kit).toHaveClass('hover_scale_xl');
});
