import React from "react"

export type FullScreenContextValue = {
  active: boolean
}

export const FullScreenContext = React.createContext<FullScreenContextValue>({
  active: false,
})
