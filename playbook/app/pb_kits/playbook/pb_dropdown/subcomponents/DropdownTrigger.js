import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { useHandleOnKeyDown } from "../hooks/useHandleOnKeydown";
import DropdownContext from "../context";
import Body from "../../pb_body/_body";
import Icon from "../../pb_icon/_icon";
import Flex from "../../pb_flex/_flex";
import FlexItem from "../../pb_flex/_flex_item";
const DropdownTrigger = (props) => {
    const { aria = {}, children, className, customDisplay, dark = false, data = {}, htmlOptions = {}, id, placeholder, } = props;
    const { autocomplete, filterItem, handleChange, handleWrapperClick, inputRef, inputWrapperRef, isDropDownClosed, isInputFocused, selected, setIsInputFocused, toggleDropdown, triggerRef, } = useContext(DropdownContext);
    const handleKeyDown = useHandleOnKeyDown();
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const classes = classnames(buildCss("pb_dropdown_trigger"), globalProps(props), className);
    const triggerWrapperClasses = buildCss("dropdown_trigger_wrapper", isInputFocused && "focus", !autocomplete && "select_only");
    const customDisplayPlaceholder = selected.label ? (_jsx("b", { children: selected.label })) : autocomplete ? ("") : placeholder ? (placeholder) : ("Select...");
    const defaultDisplayPlaceholder = selected.label
        ? selected.label
        : autocomplete
            ? ""
            : placeholder
                ? placeholder
                : "Select...";
    return (_jsx("div", Object.assign({}, ariaProps, dataProps, htmlProps, { className: classes, id: id, children: !triggerRef && (children ? (_jsx("div", { onClick: () => toggleDropdown(), onKeyDown: handleKeyDown, ref: inputWrapperRef, style: { display: "inline-block" }, tabIndex: 0, children: children })) : (_jsx(_Fragment, { children: _jsxs(Flex, { align: "center", borderRadius: "lg", className: triggerWrapperClasses, cursor: `${autocomplete ? "text" : "pointer"}`, htmlOptions: {
                    onClick: () => handleWrapperClick(),
                    onKeyDown: handleKeyDown,
                    tabIndex: "0",
                    ref: inputWrapperRef
                }, justify: "between", paddingX: "sm", paddingY: "xs", children: [_jsx(FlexItem, { children: _jsxs(Flex, { align: "center", children: [customDisplay ? (_jsxs(Flex, { align: "center", children: [customDisplay, _jsx(Body, { dark: dark, paddingLeft: `${selected.label ? "xs" : "none"}`, children: customDisplayPlaceholder })] })) : (_jsx(Body, { dark: dark, text: defaultDisplayPlaceholder })), autocomplete && (_jsx("input", { className: "dropdown_input", onChange: handleChange, onClick: () => toggleDropdown(), onFocus: () => setIsInputFocused(true), onKeyDown: handleKeyDown, placeholder: selected.label
                                        ? ""
                                        : placeholder
                                            ? placeholder
                                            : "Select...", ref: inputRef, value: filterItem }))] }) }), _jsx(Body, { dark: dark, display: "flex", htmlOptions: {
                            onClick: (e) => { e.stopPropagation(); handleWrapperClick(); }
                        }, children: _jsx(Icon, { cursor: "pointer", dark: dark, icon: `${isDropDownClosed ? "chevron-down" : "chevron-up"}`, size: "sm" }) }, `${isDropDownClosed ? "chevron-down" : "chevron-up"}`)] }) }))) })));
};
export default DropdownTrigger;
//# sourceMappingURL=DropdownTrigger.js.map