import { ensureAccessible, renderKit } from '../utilities/test-utils'

import { IconButton } from 'playbook-ui'

const props = {
  data: { testid: 'default', icon: 'plus' }
}

test('default test', () => {
  const kit = renderKit(IconButton, props)

  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_icon_button_kit_default')

  const iconElement = kit.querySelector('.icon_button_icon')
  expect(iconElement).toBeInTheDocument()
})

it("should be accessible", async () => {
  ensureAccessible(IconButton, props)
})

test('passes link variant prop', () => {
  const kit = renderKit(IconButton, { ...props, variant: "link" })
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_icon_button_kit_link')
})

test('should set button type to "submit" when htmlType prop is passed', () => {
  const kit = renderKit(IconButton, { ...props, htmlType: 'submit' })
  const buttonElement = kit.querySelector('button')
  expect(buttonElement).toHaveAttribute('type', 'submit')
})

test('passes custom classname', () => {
  const kit = renderKit(IconButton, { ...props, className: "extra_class" })
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_icon_button_kit_default extra_class')
})
