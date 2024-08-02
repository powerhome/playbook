import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { get } from 'lodash';
import classnames from 'classnames';
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props';
import { globalProps } from '../utilities/globalProps';
import Icon from '../pb_icon/_icon';
import Flex from '../pb_flex/_flex';
import Draggable from '../pb_draggable/_draggable';
// Header component
const Header = (props) => {
    const { children, className, headerColor = 'category_1', headerColorStriped = false } = props;
    const headerCSS = buildCss('pb_card_header_kit', `${headerColor}`, headerColorStriped ? 'striped' : '');
    const headerSpacing = globalProps(props);
    return (_jsx("div", { className: classnames(headerCSS, headerSpacing, className), children: children }));
};
// Body component
const Body = (props) => {
    const { children, className } = props;
    const bodyCSS = buildCss('pb_card_body_kit');
    const bodySpacing = globalProps(props);
    return (_jsx("div", { className: classnames(bodyCSS, bodySpacing, className), children: children }));
};
const Card = (props) => {
    const { aria = {}, background = 'none', borderNone = false, borderRadius = 'md', children, className, data = {}, dragId, dragHandle = true, draggableItem = false, highlight = {}, htmlOptions = {}, selected = false, tag = 'div', } = props;
    const borderCSS = borderNone == true ? 'border_none' : '';
    const selectedCSS = selected == true ? 'selected' : 'deselected';
    const backgroundCSS = background == 'none' ? '' : `background_${background}`;
    const cardCss = buildCss('pb_card_kit', selectedCSS, borderCSS, `border_radius_${borderRadius}`, backgroundCSS, {
        [`highlight_${highlight.position}`]: highlight.position,
        [`highlight_${highlight.color}`]: highlight.color,
    });
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    // coerce to array
    const cardChildren = React.Children.toArray(children);
    const subComponentTags = (tagName) => {
        return cardChildren.filter((c) => (get(c, 'type.displayName') === tagName)).map((child, i) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { key: `${tagName.toLowerCase()}-${i}` });
            }
        });
    };
    const nonHeaderChildren = cardChildren.filter((child) => (get(child, 'type.displayName') !== 'Header'));
    const tagOptions = ['div', 'section', 'footer', 'header', 'article', 'aside', 'main', 'nav'];
    const Tag = tagOptions.includes(tag) ? tag : 'div';
    return (_jsx(_Fragment, { children: draggableItem ? (_jsx(Draggable.Item, { dragId: dragId, children: _jsxs(Tag, Object.assign({}, ariaProps, dataProps, htmlProps, { className: classnames(cardCss, globalProps(props), className), children: [subComponentTags('Header'), dragHandle ? (_jsxs(Flex, { children: [_jsx("span", { className: "card_draggable_handle", children: _jsx(Icon, { icon: "grip-dots-vertical", paddingRight: "xs", verticalAlign: "middle" }) }), _jsx("div", { style: { width: '100%' }, children: nonHeaderChildren })] })) : (nonHeaderChildren)] })) }, dragId)) : (_jsxs(Tag, Object.assign({}, ariaProps, dataProps, htmlProps, { className: classnames(cardCss, globalProps(props), className), children: [subComponentTags('Header'), nonHeaderChildren] }))) }));
};
Card.Header = Header;
Card.Body = Body;
export default Card;
//# sourceMappingURL=_card.js.map