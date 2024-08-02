import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import classnames from 'classnames';
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props';
import { globalProps } from '../utilities/globalProps';
import { isValidEmoji } from '../utilities/validEmojiChecker';
const flipMap = {
    fa: {
        horizontal: 'fa-flip-horizontal',
        vertical: 'fa-flip-vertical',
        both: 'fa-flip-horizontal fa-flip-vertical',
        none: ''
    },
    svg: {
        horizontal: 'flip_horizontal',
        vertical: 'flip_vertical',
        both: 'flip_horizontal flip_vertical',
        none: ''
    }
};
const pulseMap = {
    fa: 'fa-pulse',
    svg: 'pulse'
};
const spinMap = {
    fa: 'fa-spin',
    svg: 'spin'
};
const rotateMap = {
    fa: {
        90: 'fa-rotate-90',
        180: 'fa-rotate-180',
        270: 'fa-rotate-270'
    },
    svg: {
        90: 'rotate_90',
        180: 'rotate_180',
        270: 'rotate_270'
    }
};
const sizeMap = {
    fa: {
        "lg": "fa-lg",
        "xs": "fa-xs",
        "sm": "fa-sm",
        "1x": "fa-1x",
        "2x": "fa-2x",
        "3x": "fa-3x",
        "4x": "fa-4x",
        "5x": "fa-5x",
        "6x": "fa-6x",
        "7x": "fa-7x",
        "8x": "fa-8x",
        "9x": "fa-9x",
        "10x": "fa-10x",
        "": ""
    },
    svg: {
        "lg": "svg_lg",
        "xs": "svg_xs",
        "sm": "svg_sm",
        "1x": "svg_1x",
        "2x": "svg_2x",
        "3x": "svg_3x",
        "4x": "svg_4x",
        "5x": "svg_5x",
        "6x": "svg_6x",
        "7x": "svg_7x",
        "8x": "svg_8x",
        "9x": "svg_9x",
        "10x": "svg_10x",
        "": ""
    }
};
const Icon = (props) => {
    const { aria = {}, border = false, className, color, customIcon, data = {}, fixedWidth = true, flip = "none", htmlOptions = {}, icon = "", id, inverse = false, listItem = false, pull, pulse = false, rotation, size, fontStyle = 'far', spin = false, } = props;
    let iconElement = typeof (icon) === "object" ? icon : null;
    const faClasses = {
        'fa-border': border,
        'fa-fw': fixedWidth,
        'fa-inverse': inverse,
        'fa-li': listItem,
        'fa-pulse': pulse,
        'fa-spin': spin,
        [`fa-${size}`]: size,
        [`fa-pull-${pull}`]: pull,
        [`fa-rotate-${rotation}`]: rotation,
    };
    if (!customIcon && !iconElement) {
        const PowerIcon = window.PB_ICONS ? window.PB_ICONS[icon] : null;
        if (PowerIcon) {
            iconElement = _jsx(PowerIcon, {});
        }
        else {
            faClasses[`fa-${icon}`] = icon;
        }
    }
    const isFA = !iconElement && !customIcon;
    let classes = classnames((!iconElement && !customIcon) ? 'pb_icon_kit' : '', (iconElement || customIcon) ? 'pb_custom_icon' : fontStyle, iconElement ? 'svg-inline--fa' : '', color ? `color_${color}` : '', globalProps(props), className);
    const transformClasses = classnames(flip ? flipMap[isFA ? 'fa' : 'svg'][flip] : null, pulse ? pulseMap[isFA ? 'fa' : 'svg'] : null, rotation ? rotateMap[isFA ? 'fa' : 'svg'][rotation] : null, spin ? spinMap[isFA ? 'fa' : 'svg'] : null, size ? sizeMap[isFA ? 'fa' : 'svg'][size] : null, border ? isFA ? 'fa-border' : 'svg_border' : null, fixedWidth ? isFA ? 'fa-fw' : 'svg_fw' : null, inverse ? isFA ? 'fa-inverse' : 'svg_inverse' : null, listItem ? isFA ? 'fa-li' : 'svg_li' : null, pull ? isFA ? `fa-pull-${pull}` : `pull_${pull}` : null);
    classes += ` ${transformClasses}`;
    if (isFA) {
        const faClassList = {
            'fa-border': border,
            'fa-inverse': inverse,
            'fa-li': listItem,
            [`fa-${size}`]: size,
            [`fa-pull-${pull}`]: pull,
        };
        faClassList[`fa-${icon}`] = icon;
        classes += ` ${classnames(faClassList)}`;
    }
    const classesEmoji = classnames('pb_icon_kit_emoji', globalProps(props), className);
    aria.label ? null : aria.label = `${icon} icon`;
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    // Add a conditional here to show only the SVG if custom
    const displaySVG = (customIcon) => {
        if (iconElement || customIcon)
            return (_jsx(_Fragment, { children: React.cloneElement(iconElement || customIcon, Object.assign(Object.assign(Object.assign({}, dataProps), htmlProps), { className: classes, id, width: 'auto', height: 'auto' })) }));
        else if (isValidEmoji(icon))
            return (_jsx(_Fragment, { children: _jsx("span", Object.assign({}, dataProps, htmlProps, { className: classesEmoji, id: id, children: icon })) }));
        else
            return (_jsxs(_Fragment, { children: [_jsx("i", Object.assign({}, dataProps, htmlProps, { className: classes, id: id })), _jsx("span", Object.assign({}, ariaProps, { hidden: true }))] }));
    };
    return (_jsx(_Fragment, { children: displaySVG(customIcon) }));
};
export default Icon;
//# sourceMappingURL=_icon.js.map