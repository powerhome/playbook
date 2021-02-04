import { renderKit } from '../utilities/test-utils'

import Image from './_image'

const props = {
  alt: 'picture of misty forest',
  data: { testid: 'avatar' },
  size: null,
  url: 'https://unsplash.it/500/400/?image=634',
}

test('alt attribute', () => {
  const kit = renderKit(Image, props)
  expect(kit).toHaveAttribute('alt', props.alt)
})

test('default classname', () => {
  const kit = renderKit(Image, props)
  expect(kit).toHaveClass('pb_image_kit lazyload blur_up')
})

test('size = xs', () => {
  const kit = renderKit(Image, props, { size: 'xs' })
  expect(kit).toHaveClass('pb_image_kit_xs lazyload blur_up')
})

test('rounded = true', () => {
  const kit = renderKit(Image, props, { rounded: true })
  expect(kit).toHaveClass('pb_image_kit lazyload blur_up rounded')
})

