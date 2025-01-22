import React from 'react'

const noop = (): void => void 0

type DrawerContextType = {
  onClose: () => void
}

export const DrawerContext = React.createContext<DrawerContextType>({
  onClose: noop,
})
