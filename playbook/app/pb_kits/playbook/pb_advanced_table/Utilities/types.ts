import { ExpandedState } from "@tanstack/react-table"

export type ExpandedStateObject = Extract<
  ExpandedState,
  Record<string, boolean>
>

declare global {
  interface Document {
    webkitExitFullscreen?: () => Promise<void>
    msExitFullscreen?: () => Promise<void>
    webkitRequestFullscreen?: () => Promise<void>
    msRequestFullscreen?: () => Promise<void>
    webkitFullscreenElement?: Element | null
    msFullscreenElement?: Element | null
  }
}
