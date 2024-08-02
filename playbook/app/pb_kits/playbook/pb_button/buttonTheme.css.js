import { createTheme } from '@vanilla-extract/css';
import { buttonThemeVars } from './buttonThemeContract.css.ts';
export const defaultButtonTheme = createTheme(buttonThemeVars, {
    colors: {
        primary: {
            background: '#007bff', // $primary_action
            text: '#ffffff', // $text_dk_default
            border: 'transparent',
        },
        secondary: {
            background: '#ffffff', // $secondary_action
            text: '#007bff', // $primary_action
            border: '#007bff', // $primary_action
        },
        link: {
            text: '#007bff', // $primary_action
        },
        reaction: {
            background: '#f8f9fa', // $card_light
            text: '#6c757d', // $text_lt_light
            border: '#dee2e6', // $border_light
        },
        disabled: {
            background: 'rgba(108, 117, 125, 0.4)', // rgba($slate, $opacity_4)
            text: 'rgba(33, 37, 41, 0.5)', // rgba($charcoal, $opacity_5)
        },
    },
    sizes: {
        sm: '0.75rem', // $font_smaller
        md: '0.875rem', // $font_small
        lg: '1.125rem', // ($font_large - 2px)
    },
    borderRadius: '0.375rem', // $border_rad_heavy
    transition: 'all 0.15s ease-in-out',
    // Add more theme values as needed
});
//# sourceMappingURL=buttonTheme.css.js.map