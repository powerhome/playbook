import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import Draggable from "../pb_draggable/_draggable";
const List = (props) => {
    const { aria = {}, borderless = false, children, className, dark = false, data = {}, enableDrag = false, htmlOptions = {}, id, layout = "", ordered = false, role, size = "", tabIndex, xpadding = false, variant, text, } = props;
    const layoutClass = {
        left: "layout_left",
        right: "layout_right",
        default: "",
    };
    const childrenWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, { text, variant, enableDrag });
    });
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const classes = classnames(buildCss("pb_list_kit", layoutClass[layout], size, {
        dark: dark,
        borderless: borderless,
        ordered: ordered,
        xpadding: xpadding,
    }), globalProps(props), className);
    return (_jsx(_Fragment, { children: enableDrag ? (_jsx(Draggable.Container, { children: _jsx("div", { className: classes, children: ordered ? (_jsx("ol", Object.assign({}, ariaProps, dataProps, htmlProps, { className: className, id: id, role: role, tabIndex: tabIndex, children: childrenWithProps }))) : (_jsx("ul", Object.assign({}, ariaProps, dataProps, htmlProps, { className: className, id: id, role: role, tabIndex: tabIndex, children: childrenWithProps }))) }) })) :
            (_jsx("div", { className: classes, children: ordered ? (_jsx("ol", Object.assign({}, ariaProps, dataProps, htmlProps, { className: className, id: id, role: role, tabIndex: tabIndex, children: childrenWithProps }))) : (_jsx("ul", Object.assign({}, ariaProps, dataProps, htmlProps, { className: className, id: id, role: role, tabIndex: tabIndex, children: childrenWithProps }))) })) }));
};
export default List;
//# sourceMappingURL=_list.js.map