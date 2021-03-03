import { renderKit, screen } from '../utilities/test-utils'

import TimeStacked from './_time_stacked'

/*eslint no-multiple-empty-lines: 0*/

test('returns the namespaced class', () => {
  const props = {
    data: { testid: 'default' },
    time: new Date,
  }

  renderKit(TimeStacked, props)
  expect(screen.getByTestId('default')).toHaveClass('pb_time_stacked_kit_left')

  renderKit(TimeStacked, props, {
    align: 'center',
    data: { testid: 'center' },
  })
  expect(screen.getByTestId('center')).toHaveClass('pb_time_stacked_kit_center')

  renderKit(TimeStacked, props, {
    align: 'right',
    data: { testid: 'right' },
  })
  expect(screen.getByTestId('right')).toHaveClass('pb_time_stacked_kit_right')

  renderKit(TimeStacked, props, {
    dark: true,
    data: { testid: 'dark' },
  })
  expect(screen.getByTestId('dark')).toHaveClass('pb_time_stacked_kit_left dark')
})
