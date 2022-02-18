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

test('customColor prop styles background color with a hex value', () => {
  const kit = renderKit(Background, props, { customColor: '#1d99a8' })

  expect(kit).toHaveClass('pb_background_kit pb_background_custom_color')
  expect(kit).toHaveStyle(`background-color: #1d99a8;`)
})
