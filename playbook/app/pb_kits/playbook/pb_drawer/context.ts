import React from 'react'

// No-op function that explicitly does nothing
const noop = () => {
  /* intentionally empty */
}

type DrawerContextType = {
  onClose: () => void
}

export const DrawerContext = React.createContext<DrawerContextType>({
  // Default no-op function - will be overridden by Drawer component
  onClose: noop,
})
