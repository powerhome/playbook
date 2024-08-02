import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import classnames from 'classnames';
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props';
import { globalProps } from '../utilities/globalProps';
import Icon from '../pb_icon/_icon';
import Body from '../pb_body/_body';
import Draggable from '../pb_draggable/_draggable';
const ListItem = (props) => {
    const { aria = {}, children, className, data = {}, enableDrag, dragId, dragHandle = true, htmlOptions = {}, id, tabIndex, } = props;
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const classes = classnames(buildCss('pb_item_kit'), globalProps(props), className);
    return (_jsx(_Fragment, { children: enableDrag ? (_jsx(Draggable.Item, { dragId: dragId, children: _jsxs("li", Object.assign({}, ariaProps, dataProps, htmlProps, { className: classes, id: id, tabIndex: tabIndex, children: [dragHandle && (_jsx("span", { style: { verticalAlign: 'middle' }, children: _jsx(Body, { color: "light", children: _jsx(Icon, { icon: "grip-dots-vertical", verticalAlign: "middle" }) }) })), children] })) })) : (_jsx("li", Object.assign({}, ariaProps, dataProps, htmlProps, { className: classes, id: id, tabIndex: tabIndex, children: children }))) }));
};
export default ListItem;
//# sourceMappingURL=_list_item.js.map