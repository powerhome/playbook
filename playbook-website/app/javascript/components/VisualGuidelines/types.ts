/* eslint-disable flowtype/no-types-missing-file-annotation */
export type Variable = {
  dark?: boolean,
  name: string,
  variable: string,
}

export type Example = {
  colors: Variable[],
  title: string,
}

export type StatusExample = {
  statusColors: Variable[],
  subtleColors: Variable[],
  title: string,
}
