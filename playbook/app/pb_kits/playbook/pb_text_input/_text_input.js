import { createElement as _createElement } from "react";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { globalProps, domSafeProps } from '../utilities/globalProps';
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props';
import Flex from '../pb_flex/_flex';
import Card from '../pb_card/_card';
import Caption from '../pb_caption/_caption';
import Body from '../pb_body/_body';
import Icon from '../pb_icon/_icon';
const TextInput = (props, ref) => {
    const { addOn = { icon: null, alignment: 'right', border: true }, aria = {}, className, dark = false, data = {}, disabled, error, htmlOptions = {}, id, inline = false, name, label, onChange = () => { void 0; }, placeholder, required, type = 'text', value = '', children = null, } = props;
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const filteredProps = Object.assign({}, props);
    if (filteredProps.marginBottom === undefined) {
        filteredProps.marginBottom = "sm";
    }
    const { alignment, border, icon } = addOn;
    const addOnAlignment = alignment === 'left' ? 'left' : 'right';
    const borderToChange = addOnAlignment === 'left' ? 'right' : 'left';
    const borderToggle = border === false ? 'off' : 'on';
    const borderCss = `border_${borderToChange}_${borderToggle}`;
    const shouldShowAddOn = icon !== null;
    const addOnCss = shouldShowAddOn ? 'text_input_wrapper_add_on' : "";
    const addOnDarkModeCardCss = (shouldShowAddOn && dark) ? 'add-on-card-dark' : "";
    const css = classnames([
        'pb_text_input_kit',
        inline ? 'inline' : "",
        error ? 'error' : "",
        globalProps(filteredProps),
        className,
    ]);
    const addOnIcon = (_jsx(Icon, { className: "add-on-icon", dark: dark, fixedWidth: false, icon: icon }));
    const childInput = children ? children.type === "input" : undefined;
    const textInput = (childInput ? React.cloneElement(children, { className: "text_input" }) :
        (_createElement("input", Object.assign({}, domSafeProps(props), { className: "text_input", disabled: disabled, id: id, key: id, name: name, onChange: onChange, placeholder: placeholder, ref: ref, required: required, type: type, value: value }))));
    const addOnInput = (_jsx(React.Fragment, { children: _jsxs(Flex, { className: `add-on-${addOnAlignment} ${borderCss}`, vertical: "center", children: [addOnAlignment == 'left' && _jsxs(_Fragment, { children: [_jsx(Card, { className: `${addOnDarkModeCardCss} add-on-card card-left-aligned`, dark: dark, children: addOnIcon }), textInput] }), addOnAlignment != 'left' && _jsxs(_Fragment, { children: [textInput, _jsx(Card, { className: `${addOnDarkModeCardCss} add-on-card card-right-aligned`, dark: dark, children: addOnIcon })] })] }) }));
    const render = (() => {
        if (children && !childInput)
            return children;
        if (shouldShowAddOn)
            return addOnInput;
        return textInput;
    })();
    return (_jsxs("div", Object.assign({}, ariaProps, dataProps, htmlProps, { className: css, children: [label &&
                _jsx(Caption, { className: "pb_text_input_kit_label", text: label }), _jsxs("div", { className: `${addOnCss} text_input_wrapper`, children: [render, error && _jsx(Body, { status: "negative", text: error, variant: null })] })] })));
};
export default forwardRef(TextInput);
//# sourceMappingURL=_text_input.js.map