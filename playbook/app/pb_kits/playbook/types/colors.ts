/* Legacy color token types — from tokens/_colors.scss */
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

/* Accessible color token types — from tokens/_colors_accessible.scss */
export type AccessibleTextColors = 'text_default' | 'text_light' | 'text_lighter' | 'text_success' | 'text_error' | 'text_link' |
    'text_default_dark' | 'text_light_dark' | 'text_lighter_dark' | 'text_success_dark' | 'text_error_dark' | 'text_link_dark'
export type AccessibleInputTextColors = 'input_text_default' | 'input_text_active' | 'input_text_disabled' | 'input_text_error' |
    'input_text_default_dark' | 'input_text_state_active' | 'input_text_disabled_dark' | 'input_text_error_dark'
export type AccessibleInputBackgroundColors = 'input_background_default' | 'input_background_state' | 'input_background_disabled' |
    'input_background_default_dark' | 'input_background_state_dark' | 'input_background_disabled_dark'
export type AccessibleInputBorderColors = 'input_border_default' | 'input_border_state' | 'input_border_error' | 'input_border_disabled' |
    'input_border_default_dark' | 'input_border_state_dark' | 'input_border_error_dark' | 'input_border_disabled_dark'
export type AccessibleStatusTextColors = 'status_text_neutral' | 'status_text_primary' | 'status_text_success' | 'status_text_error' |
    'status_text_warning' | 'status_text_info' | 'status_text_notification' |
    'status_text_neutral_dark' | 'status_text_primary_dark' | 'status_text_success_dark' | 'status_text_error_dark' |
    'status_text_warning_dark' | 'status_text_info_dark'
export type AccessibleStatusBackgroundColors = 'status_background_neutral' | 'status_background_primary' | 'status_background_success' |
    'status_background_error' | 'status_background_warning' | 'status_background_info' | 'status_background_notification' |
    'status_background_notificationError' | 'status_background_neutral_hover' | 'status_background_primary_hover' |
    'status_background_success_hover' | 'status_background_error_hover' | 'status_background_warning_hover' |
    'status_background_info_hover' | 'status_background_dark' | 'status_background_notification_dark' |
    'status_background_notificationError_dark' | 'status_background_neutral_hover_dark' | 'status_background_primary_hover_dark' |
    'status_background_success_hover_dark' | 'status_background_error_hover_dark' | 'status_background_warning_hover_dark' |
    'status_background_info_hover_dark'
export type AccessibleStatusIconBackgroundColors = 'status_iconBackground_neutral_hover' | 'status_iconBackground_primary_hover' |
    'status_iconBackground_success_hover' | 'status_iconBackground_error_hover' | 'status_iconBackground_warning_hover' |
    'status_iconBackground_info_hover' | 'status_iconBackground_neutral_hover_dark' | 'status_iconBackground_primary_hover_dark' |
    'status_iconBackground_success_hover_dark' | 'status_iconBackground_error_hover_dark' |
    'status_iconBackground_warning_hover_dark' | 'status_iconBackground_info_hover_dark'
export type AccessibleStatusBorderColors = 'status_border_neutral' | 'status_border_primary' | 'status_border_success' |
    'status_border_error' | 'status_border_warning' | 'status_border_info' | 'status_border_notification' |
    'status_border_neutral_dark' | 'status_border_primary_dark' | 'status_border_success_dark' | 'status_border_error_dark' |
    'status_border_warning_dark' | 'status_border_info_dark' | 'status_border_focus' | 'status_border_focus_dark'
export type AccessibleColors = AccessibleTextColors | AccessibleInputTextColors | AccessibleInputBackgroundColors |
    AccessibleInputBorderColors | AccessibleStatusTextColors | AccessibleStatusBackgroundColors |
    AccessibleStatusIconBackgroundColors | AccessibleStatusBorderColors

export type Colors = ProductColors & StatusColors & DataColors & ShadowColors & InterfaceColors & MainColors &
    BackgroundKitColors & CardColors & ActiveColors & ActionColors & HoverColors & BorderColors & TextColors &
    CategoryColors & BaseColors & FocusInputColors & StatusTextColors | AccessibleColors