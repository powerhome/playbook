import { ensureAccessible, renderKit } from '../utilities/test-utils'

import { CopyButton } from 'playbook-ui'

const props = {
  data: { testid: 'default' }
}

test('returns namespaced class name', () => {
  const kit = renderKit(CopyButton , props)
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_copy_button_kit')
})

it("should be accessible", async () => {
  ensureAccessible(CopyButton, props)
})
