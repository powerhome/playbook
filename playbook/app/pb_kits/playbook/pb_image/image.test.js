import { ensureAccessible, renderKit } from '../utilities/test-utils'

import Image from './_image'

const props = {
  alt: 'picture of misty forest',
  data: { testid: 'avatar' },
  size: null,
  url: 'https://unsplash.it/500/400/?image=634',
  transition: 'blur',
}

it('Should be accessible', async () => {
  ensureAccessible(Image, props)
})

test('alt attribute', () => {
  const kit = renderKit(Image, props)
  expect(kit).toHaveAttribute('alt', props.alt)
})

test('default classname', () => {
  const kit = renderKit(Image, props)
  expect(kit).toHaveClass('pb_image_kit lazyload')
})

test('size = xs', () => {
  const kit = renderKit(Image, props, { size: 'xs' })
  expect(kit).toHaveClass('pb_image_kit_size_xs lazyload')
})

test('transition = blur', () => {
  const kit = renderKit(Image, props, { transition: 'blur' })
  expect(kit).toHaveClass('pb_image_kit lazyload blur')
})

test('rounded = true', () => {
  const kit = renderKit(Image, props, { rounded: true })
  expect(kit).toHaveClass('pb_image_kit lazyload rounded')
})
