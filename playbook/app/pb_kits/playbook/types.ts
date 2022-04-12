import { SyntheticEvent } from "react"

export type Callback<T, K> = (arg: T) => K
export type InputCallback<T> = Callback<SyntheticEvent<T>, void>

export type BackgroundColors = "white" | "dark" | "light"
export type CategoryColors = "category_1" | "category_2" | "category_3" | "category_4" | "category_5" | "category_6" | "category_7" | "category_8" | "category_9" | "category_10" | "category_11" | "category_12" | "category_13" | "category_14" | "category_15" | "category_16" | "category_17" | "category_18" | "category_19" | "category_20" | "category_21"
export type ProductColors = "windows" | "siding" | "doors" | "solar" | "roofing" | "gutters" | "insulation"
