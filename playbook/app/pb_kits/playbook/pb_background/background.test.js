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

test('backgroundRepeat = repeat', () => {
  const kit = renderKit(Background, props, { classname: "background-image", imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80", backgroundRepeat: 'repeat' })
  expect(kit).toHaveStyle('background-repeat: repeat')
})

test('backgroundSize = auto', () => {
  const kit = renderKit(Background, props, { classname: "background-image", imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80", backgroundSize: 'auto' })
  expect(kit).toHaveStyle('background-size: auto')
})
