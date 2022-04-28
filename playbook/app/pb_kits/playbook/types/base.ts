// Simple base types
import { SyntheticEvent } from "react"

export type Binary = 0 | 1
export type Callback<T, K> = (arg: T) => K
export type EmptyObject = Record<string, unknown>
export type InputCallback<T> = Callback<SyntheticEvent<T>, void>
export type Noop = () => void
