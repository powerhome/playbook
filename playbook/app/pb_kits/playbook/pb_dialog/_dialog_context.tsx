import React from "react"

export type DialogContextValue = {
  onClose?: () => void
  // Mount point for form inputs with dropdowns so they escape dialog scroll/overflow.
  selectMenuPortalTarget?: HTMLElement | null
}

export const DialogContext = React.createContext<DialogContextValue | null>(null)
