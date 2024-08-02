import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import DropdownContext from "../context";
import List from "../../pb_list/_list";
import ListItem from "../../pb_list/_list_item";
import TextInput from "../../pb_text_input/_text_input";
import Body from "../../pb_body/_body";
const DropdownContainer = (props) => {
    const { aria = {}, children, className, dark = false, data = {}, htmlOptions = {}, id, searchbar = false, } = props;
    const { dropdownContainerRef, filteredOptions, filterItem, handleChange, inputRef, isDropDownClosed, setFocusedOptionIndex, triggerRef } = useContext(DropdownContext);
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const classes = classnames(buildCss("pb_dropdown_container"), `${isDropDownClosed ? "close" : "open"}`, globalProps(props), className);
    return (_jsxs("div", Object.assign({}, ariaProps, dataProps, htmlProps, { className: classes, id: id, onMouseEnter: () => setFocusedOptionIndex(-1), ref: dropdownContainerRef, style: triggerRef ? {} : { position: "absolute" }, children: [searchbar && (_jsx(TextInput, { dark: dark, paddingTop: "xs", paddingX: "xs", children: _jsx("input", { onChange: handleChange, placeholder: "Select...", ref: inputRef, value: filterItem }) })), _jsx(List, { dark: dark, children: (filteredOptions === null || filteredOptions === void 0 ? void 0 : filteredOptions.length) === 0 ? (_jsx(ListItem, { dark: dark, display: "flex", 
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    justifyContent: "center", padding: "xs", children: _jsx(Body, { color: "light", dark: dark, text: "no option" }) })) : (children) })] })));
};
export default DropdownContainer;
//# sourceMappingURL=DropdownContainer.js.map