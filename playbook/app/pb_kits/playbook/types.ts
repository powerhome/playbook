import { SyntheticEvent } from "react"

export type Callback<T, K> = (arg: T) => K
export type InputCallback<T> = Callback<SyntheticEvent<T>, void>
