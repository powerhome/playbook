// @flow

export type Callback<T, K> = T => K
export type InputCallback<T> = Callback<SyntheticEvent<T>, void>
