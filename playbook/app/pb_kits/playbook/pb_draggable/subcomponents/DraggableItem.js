import { createElement as _createElement } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { DraggableContext } from "../context";
const DraggableItem = (props) => {
    const { aria = {}, children, className, container, data = {}, htmlOptions = {}, id, dragId } = props;
    const { isDragging, handleDragStart, handleDragEnter, handleDragEnd } = DraggableContext();
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const classes = classnames(buildCss("pb_draggable_item"), `${isDragging === dragId ? "is_dragging" : ""}`, globalProps(props), className);
    return (_createElement("div", Object.assign({}, ariaProps, dataProps, htmlProps, { className: classes, draggable: true, id: id, key: dragId, onDragEnd: () => handleDragEnd(), onDragEnter: () => handleDragEnter(dragId, container), onDragStart: () => handleDragStart(dragId, container) }), children));
};
export default DraggableItem;
//# sourceMappingURL=DraggableItem.js.map