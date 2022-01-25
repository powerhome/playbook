import { debounce } from 'lodash'
import { useCallback, useMemo, useState } from 'react'

export default function useVisibility(initialState = false) {
  const [visible, setVisible] = useState(initialState)
  const hide = useCallback(() => setVisible(false), [])
  const show = useCallback(({ afterDelay = 0 } = {}) => {
    debounce(() => setVisible(true), afterDelay)()
  }, [])
  const toggle = useCallback(() => setVisible((current) => !current), [])

  return useMemo(
    () => ({
      hide,
      show,
      toggle,
      visible,
    }),
    [hide, show, toggle, visible]
  )
}
