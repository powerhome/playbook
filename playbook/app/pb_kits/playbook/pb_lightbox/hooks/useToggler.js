/* @flow */

import { useState } from 'react'

export const useToggler = (startValue: boolean = false) => {
  const [show, toggle] = useState(startValue)
  const toggler = () => toggle(!show)

  return [show, toggler]
}
