import { ensureAccessible, renderKit } from '../utilities/test-utils'

import Background from './_background'

const props = {
  data: { testid: 'background' },
  backgroundColor: null,
}

it('Should be accessible', async () => {
  ensureAccessible(Background, props)
})

test('backgroundColor = success', () => {
  const kit = renderKit(Background, props, { backgroundColor: 'success' })
  expect(kit).toHaveClass('pb_background_kit pb_background_color_success')
})

test('backgroundColor = category_1', () => {
  const kit = renderKit(Background, props, { backgroundColor: 'category_1' })
  expect(kit).toHaveClass('pb_background_kit pb_background_color_category_1')
})

test('backgroundSize = auto', () => {
  const kit = renderKit(Background, props, { backgroundSize: 'auto' })
  expect(kit).toHaveStyle('pb_background_kit pb_background_size_auto')
})
