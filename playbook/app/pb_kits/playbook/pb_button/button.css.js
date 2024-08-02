import { style, styleVariants } from '@vanilla-extract/css';
import { buttonThemeVars } from './buttonThemeContract.css.ts';
const baseButton = style({
    textRendering: 'optimizeLegibility',
    fontWeight: 'bold',
    letterSpacing: '0.05em', // $lspace_loose
    textAlign: 'center',
    textDecoration: 'none',
    verticalAlign: 'middle',
    textTransform: 'none',
    borderWidth: '0px',
    borderStyle: 'solid',
    borderRadius: buttonThemeVars.borderRadius,
    minHeight: '40px',
    lineHeight: 1.5,
    cursor: 'pointer',
    outline: 'none',
    transition: buttonThemeVars.transition,
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: 'auto',
    width: 'fit-content',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
    ':hover': {
        outline: 'none',
    },
    ':active': {
        outline: 'none',
        borderWidth: '0px',
    },
    // Add focus styles here
});
export const buttonVariants = styleVariants({
    primary: [baseButton, {
            backgroundColor: buttonThemeVars.colors.primary.background,
            color: buttonThemeVars.colors.primary.text,
            borderColor: buttonThemeVars.colors.primary.border,
            ':hover': {
                backgroundColor: `color-mix(in srgb, ${buttonThemeVars.colors.primary.background} 96%, black)`,
            },
        }],
    secondary: [baseButton, {
            backgroundColor: buttonThemeVars.colors.secondary.background,
            color: buttonThemeVars.colors.secondary.text,
            borderColor: buttonThemeVars.colors.secondary.border,
            ':hover': {
                backgroundColor: `color-mix(in srgb, ${buttonThemeVars.colors.secondary.background}, ${buttonThemeVars.colors.secondary.text} 3%)`,
            },
        }],
    link: [baseButton, {
            backgroundColor: 'transparent',
            color: buttonThemeVars.colors.link.text,
            borderColor: 'transparent',
            ':hover': {
                color: `color-mix(in srgb, ${buttonThemeVars.colors.link.text}, black 15%)`,
            },
        }],
    reaction: [baseButton, {
            backgroundColor: buttonThemeVars.colors.reaction.background,
            color: buttonThemeVars.colors.reaction.text,
            borderColor: buttonThemeVars.colors.reaction.border,
            minWidth: '40px',
            borderRadius: '9999px', // $border_radius_rounded
            padding: '5px 12px',
            minHeight: '36px',
            ':hover': {
                backgroundColor: `color-mix(in srgb, ${buttonThemeVars.colors.reaction.background}, black 3%)`,
            },
        }],
});
export const buttonSizes = styleVariants(buttonThemeVars.sizes, (size) => [
    {
        fontSize: size,
        padding: `calc(${size} / 2) calc(${size} * 2.42)`,
    },
]);
export const buttonDisabled = style({
    backgroundColor: buttonThemeVars.colors.disabled.background,
    color: buttonThemeVars.colors.disabled.text,
    cursor: 'not-allowed',
    ':hover': {
        backgroundColor: buttonThemeVars.colors.disabled.background,
        color: buttonThemeVars.colors.disabled.text,
    },
});
export const buttonBlock = style({
    display: 'flex',
    flexBasis: '100%',
    width: '100%',
});
export const buttonLoading = style({
    position: 'relative',
    '.loading-icon': {
        position: 'absolute',
        display: 'block',
    },
    '.pb_button_content': {
        visibility: 'hidden',
    },
});
//# sourceMappingURL=button.css.js.map