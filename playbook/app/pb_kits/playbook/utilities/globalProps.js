import { omit } from 'lodash';
import { camelToSnakeCase } from './text';
import { BitValues, } from '../types';
const getResponsivePropClasses = (prop, classPrefix) => {
    const keys = Object.keys(prop);
    return keys.map((size) => {
        const propValue = typeof (prop[size]) === 'string' ? camelToSnakeCase(prop[size]) : prop[size];
        return `${classPrefix}_${size}_${propValue}`;
    }).join(" ");
};
//reusable function for top, bottom, right and left props
const getPositioningPropsClasses = (position, value) => {
    let css = "";
    if (typeof value === 'string') {
        css += `${position}_${value}`;
    }
    else if (typeof value === 'object' && value.inset) {
        css += `${position}_${value.value}_inset`;
    }
    else if (typeof value === 'object') {
        css += `${position}_${value.value}`;
    }
    return css;
};
// Prop categories
const PROP_CATEGORIES = {
    hoverProps: ({ hover }) => {
        let css = '';
        if (!hover)
            return css;
        css += hover.shadow ? `hover_shadow_${hover.shadow} ` : '';
        css += hover.background ? `hover_background_${hover.background} ` : '';
        css += hover.scale ? `hover_scale_${hover.scale} ` : '';
        css += hover.color ? `hover_color_${hover.color} ` : '';
        return css;
    },
    spacingProps: ({ marginRight, marginLeft, marginTop, marginBottom, marginX, marginY, margin, paddingRight, paddingLeft, paddingTop, paddingBottom, paddingX, paddingY, padding, }) => {
        let css = '';
        const spacingProps = {
            marginRight,
            marginLeft,
            marginTop,
            marginBottom,
            marginX,
            marginY,
            margin,
            paddingRight,
            paddingLeft,
            paddingTop,
            paddingBottom,
            paddingX,
            paddingY,
            padding,
        };
        const screenSizeValues = ["xs", "sm", "md", "lg", "xl"];
        function handleObjectValue(properties, prefix) {
            let classResult = '';
            const breakValue = properties.break || "on";
            const defaultValue = properties.default || null;
            Object.entries(properties).forEach(([key, value]) => {
                if (screenSizeValues.includes(key)) {
                    classResult += `break_${breakValue}_${key}:${prefix}_${value} `;
                }
            });
            if (defaultValue) {
                classResult += `${prefix}_${defaultValue} `;
            }
            return classResult;
        }
        function getPrefix(key) {
            const prefixes = {
                marginRight: 'mr',
                marginLeft: 'ml',
                marginTop: 'mt',
                marginBottom: 'mb',
                marginX: 'mx',
                marginY: 'my',
                margin: 'm',
                paddingRight: 'pr',
                paddingLeft: 'pl',
                paddingTop: 'pt',
                paddingBottom: 'pb',
                paddingX: 'px',
                paddingY: 'py',
                padding: 'p',
            };
            return prefixes[key];
        }
        Object.entries(spacingProps).forEach(([key, value]) => {
            if (value) {
                if (typeof value === 'object') {
                    css += handleObjectValue(value, getPrefix(key));
                }
                else {
                    const prefix = getPrefix(key);
                    css += `${prefix}_${value} `;
                }
            }
        });
        return css.trim();
    },
    borderRadiusProps: ({ borderRadius }) => {
        let css = '';
        css += borderRadius ? `border_radius_${borderRadius} ` : '';
        return css;
    },
    overflowProps: ({ overflow, overflowX, overflowY }) => {
        let css = '';
        css += overflow ? `overflow_${overflow}` : '';
        css += overflowX ? `overflow_x_${overflowX}` : '';
        css += overflowY ? `overflow_y_${overflowY}` : '';
        return css;
    },
    truncateProps: ({ truncate }) => {
        if (typeof truncate === 'object') {
            return '';
        }
        else {
            return truncate ? `truncate_${truncate}` : '';
        }
    },
    darkProps: ({ dark }) => dark ? 'dark' : '',
    numberSpacingProps: ({ numberSpacing }) => {
        let css = '';
        css += numberSpacing ? `ns_${numberSpacing} ` : '';
        return css;
    },
    maxWidthProps: ({ maxWidth }) => {
        let css = '';
        css += maxWidth ? `max_width_${maxWidth} ` : '';
        return css;
    },
    zIndexProps: (zIndex) => {
        let css = '';
        Object.entries(zIndex).forEach((zIndexEntry) => {
            if (zIndexEntry[0] == "zIndex") {
                if (typeof zIndexEntry[1] == "number") {
                    css += `z_index_${zIndexEntry[1]} `;
                }
                else if (typeof zIndexEntry[1] == "object") {
                    Object.entries(zIndexEntry[1]).forEach((zIndexObj) => {
                        css += `z_index_${zIndexObj[0]}_${zIndexObj[1]} `;
                    });
                }
            }
        });
        return css;
    },
    shadowProps: ({ shadow }) => {
        let css = '';
        css += shadow ? `shadow_${shadow} ` : '';
        return css;
    },
    lineHeightProps: ({ lineHeight }) => {
        let css = '';
        css += lineHeight ? `line_height_${lineHeight} ` : '';
        return css;
    },
    displayProps: (display) => {
        let css = '';
        Object.entries(display).forEach((displayEntry) => {
            if (displayEntry[0] == "display") {
                if (typeof displayEntry[1] == "string") {
                    css += `display_${displayEntry[1]} `;
                }
                else if (typeof displayEntry[1] == "object") {
                    Object.entries(displayEntry[1]).forEach((displayObj) => {
                        css += `display_${displayObj[0]}_${displayObj[1]} `;
                    });
                }
                else {
                    ' ';
                }
            }
        });
        return css;
    },
    cursorProps: ({ cursor }) => {
        let css = '';
        css += cursor ? `cursor_${camelToSnakeCase(cursor)}` : '';
        return css;
    },
    alignContentProps: ({ alignContent }) => {
        if (typeof alignContent === 'object') {
            return getResponsivePropClasses(alignContent, 'align_content');
        }
        return alignContent ? `align_content_${camelToSnakeCase(alignContent)}` : '';
    },
    alignItemsProps: ({ alignItems }) => {
        if (typeof alignItems === 'object') {
            return getResponsivePropClasses(alignItems, 'align_items');
        }
        else {
            return alignItems ? `align_items_${camelToSnakeCase(alignItems)}` : '';
        }
    },
    alignSelfProps: ({ alignSelf }) => {
        if (typeof alignSelf === 'object') {
            return getResponsivePropClasses(alignSelf, 'align_self');
        }
        else {
            return alignSelf ? `align_self_${alignSelf}` : '';
        }
    },
    flexDirectionProps: ({ flexDirection }) => {
        if (typeof flexDirection == 'object') {
            return getResponsivePropClasses(flexDirection, 'flex_direction');
        }
        else {
            return flexDirection ? `flex_direction_${camelToSnakeCase(flexDirection)}` : '';
        }
    },
    flexWrapProps: ({ flexWrap }) => {
        if (typeof flexWrap == 'object') {
            return getResponsivePropClasses(flexWrap, 'flex_wrap');
        }
        else {
            return flexWrap ? `flex_wrap_${camelToSnakeCase(flexWrap)}` : '';
        }
    },
    flexProps: ({ flex }) => {
        if (typeof flex === 'object') {
            return getResponsivePropClasses(flex, 'flex');
        }
        else {
            return flex ? `flex_${flex}` : '';
        }
    },
    flexGrowProps: ({ flexGrow }) => {
        if (typeof flexGrow == 'object') {
            return getResponsivePropClasses(flexGrow, 'flex_grow');
        }
        else if (BitValues.includes(flexGrow)) {
            return `flex_grow_${flexGrow}`;
        }
        else {
            return '';
        }
    },
    flexShrinkProps: ({ flexShrink }) => {
        if (typeof flexShrink == 'object') {
            return getResponsivePropClasses(flexShrink, 'flex_shrink');
        }
        else if (BitValues.includes(flexShrink)) {
            return `flex_shrink_${flexShrink}`;
        }
        else {
            return '';
        }
    },
    justifyContentProps: ({ justifyContent }) => {
        if (typeof justifyContent === 'object') {
            return getResponsivePropClasses(justifyContent, 'justify_content');
        }
        else {
            return justifyContent ? `justify_content_${camelToSnakeCase(justifyContent)}` : '';
        }
    },
    justifySelfProps: ({ justifySelf }) => {
        if (typeof justifySelf === 'object') {
            return getResponsivePropClasses(justifySelf, 'justify_self');
        }
        else {
            return justifySelf ? `justify_self_${justifySelf}` : '';
        }
    },
    orderProps: ({ order }) => {
        if (typeof order === 'object') {
            return getResponsivePropClasses(order, 'flex_order');
        }
        else {
            return order ? `flex_order_${order}` : '';
        }
    },
    positionProps: ({ position }) => {
        let css = '';
        css += position && position !== 'static' ? `position_${position}` : '';
        return css;
    },
    topProps: ({ top }) => getPositioningPropsClasses('top', top),
    rightProps: ({ right }) => getPositioningPropsClasses('right', right),
    bottomProps: ({ bottom }) => getPositioningPropsClasses('bottom', bottom),
    leftProps: ({ left }) => getPositioningPropsClasses('left', left),
    textAlignProps: ({ textAlign }) => {
        if (typeof textAlign === 'object') {
            return getResponsivePropClasses(textAlign, 'text_align');
        }
        else {
            return textAlign ? `text_align_${textAlign} ` : '';
        }
    },
    verticalAlignProps: ({ verticalAlign }) => {
        if (typeof verticalAlign === 'object') {
            return getResponsivePropClasses(verticalAlign, 'vertical_align');
        }
        else {
            return verticalAlign ? `vertical_align_${verticalAlign} ` : '';
        }
    }
};
export const globalProps = (props, defaultProps = {}) => {
    const allProps = Object.assign(Object.assign({}, props), defaultProps);
    return Object.keys(PROP_CATEGORIES).map((key) => {
        return PROP_CATEGORIES[key](allProps);
    }).filter((value) => (value === null || value === void 0 ? void 0 : value.length) > 0).join(" ");
};
export const deprecatedProps = () => {
    // if (process.env.NODE_ENV === 'development') {
    //   /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    //   props.forEach((prop) => {
    //     console.warn(`${kit} Kit: The prop '${prop}' is deprecated and will be removed in a future release!`)
    //   })
    // }
};
export const domSafeProps = (props) => {
    const notSafeProps = [
        'marginRight',
        'marginLeft',
        'marginTop',
        'marginBottom',
        'marginX',
        'marginY',
        'margin',
        'paddingRight',
        'paddingLeft',
        'paddingTop',
        'paddingBottom',
        'paddingX',
        'paddingY',
        'padding',
        'dark',
        'enableDrag',
    ];
    return omit(props, notSafeProps);
};
//# sourceMappingURL=globalProps.js.map