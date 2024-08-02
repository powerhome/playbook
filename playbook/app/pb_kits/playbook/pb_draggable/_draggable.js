import { jsx as _jsx } from "react/jsx-runtime";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps } from "../utilities/globalProps";
import DraggableContainer from "./subcomponents/DraggableContainer";
import DraggableItem from "./subcomponents/DraggableItem";
const Draggable = (props) => {
    const { aria = {}, className, children, data = {}, htmlOptions = {}, id, } = props;
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const classes = classnames(buildCss("pb_draggable"), globalProps(props), className);
    return (_jsx("div", Object.assign({}, ariaProps, dataProps, htmlProps, { className: classes, id: id, children: children })));
};
Draggable.Container = DraggableContainer;
Draggable.Item = DraggableItem;
export default Draggable;
//# sourceMappingURL=_draggable.js.map