export type BackgroundColors = "white" | "dark" | "light"
export type ProductColors = 'windows' | 'siding' | 'doors' | 'solar' | 'roofing' | 'gutters' | 'insulation' |
    'product_1_background' | 'product_1_highlight' | 'product_2_background' | 'product_2_highlight' |
    'product_3_background' | 'product_3_highlight' | 'product_4_background' | 'product_4_highlight' |
    'product_5_background' | 'product_5_highlight' | 'product_6_background' | 'product_6_highlight' |
    'product_7_background' | 'product_7_highlight' | 'product_8_background' | 'product_8_highlight' |
    'product_9_background' | 'product_9_highlight' | 'product_10_background' | 'product_10_highlight'

export type StatusColors = 'success' | 'success_secondary' | 'success_sm' | 'success_subtle' |
    'warning' | 'warning_secondary' | 'warning_subtle' | 'error' | 'error_secondary' | 'error_subtle' |
    'info' | 'info_secondary' | 'info_subtle' | 'neutral' | 'neutral_secondary' | 'neutral_subtle' |
    'primary' | 'primary_secondary'

export type CategoryColors = 'category_1' | 'category_2' | 'category_3' | 'category_4' | 'category_5' |
    'category_6' | 'category_7' | 'category_8' | 'category_9' | 'category_10' | 'category_11' |
    'category_12' | 'category_13' | 'category_14' | 'category_15' | 'category_16' | 'category_17' |
    'category_18' | 'category_19' | 'category_20' | 'category_21'

export type DataColors = 'data_1' | 'data_2' | 'data_3' | 'data_4' | 'data_5' | 'data_6' | 'data_7' | 'data_8'
export type ShadowColors = 'shadow' | 'shadow_dark'
export type BaseColors = 'royal' | 'purple' | 'teal' | 'red' | 'yellow' | 'green' | 'orange' | 'default'
export type InterfaceColors = 'white' | 'silver' | 'slate' | 'charcoal' | 'black'
export type MainColors = 'primary' | 'secondary' | 'tertiary'
export type BackgroundKitColors = 'bg_light' | 'bg_dark' | 'bg_dark_card'
export type CardColors = 'card_light' | 'card_dark'
export type ActiveColors = 'active_light' | 'active_dark'
export type ActionColors = 'primary_action'
export type HoverColors = 'hover_light' | 'hover_dark'
export type BorderColors = 'border_light' | 'border_dark'
export type TextColors = 'text_lt_default' | 'text_lt_light' | 'text_lt_lighter' | 'text_dk_default' | 'text_dk_light' | 'text_dk_lighter'
export type FocusInputColors = 'focus_input_light' | 'focus_input_dark' | 'focus_color'
export type StatusTextColors = 'success' | 'success_sm' | 'warning' | 'error' | 'info' | 'neutral' | 'primary'

export type Colors = ProductColors & StatusColors & DataColors & ShadowColors & InterfaceColors & MainColors &
    BackgroundKitColors & CardColors & ActiveColors & ActionColors & HoverColors & BorderColors & TextColors &
    CategoryColors & BaseColors & FocusInputColors & StatusTextColors