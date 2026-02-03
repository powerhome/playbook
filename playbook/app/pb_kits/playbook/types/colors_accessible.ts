/**
 * Accessible color token types (WCAG-compliant).
 * Use for PCA kit-level updates. Import from here when you only want the new set.
 * See docs/ACCESSIBLE_COLORS.md for usage and guardrails.
 */

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
