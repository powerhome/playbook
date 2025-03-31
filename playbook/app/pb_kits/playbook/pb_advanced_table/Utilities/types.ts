import { ExpandedState } from "@tanstack/react-table"

export type ExpandedStateObject = Extract<
  ExpandedState,
  Record<string, boolean>
>