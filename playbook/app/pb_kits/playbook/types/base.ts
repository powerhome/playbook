// Simple base types
import { SyntheticEvent } from "react"

export const BitValues = [0, 1] as const
export type Binary = typeof BitValues[number]
export type Callback<T, K> = (arg: T) => K
export type VoidCallback = () => void
export type EmptyObject = Record<string, unknown>
export type InputCallback<T> = Callback<SyntheticEvent<T>, void>
export type Noop = () => void