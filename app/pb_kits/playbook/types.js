// @flow

export type Callback<T, K> = T => K
export type InputCallback = Callback<SyntheticEvent<>, void>
