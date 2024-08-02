import { createElement as _createElement } from "react";
import classnames from "classnames";
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../../utilities/props";
import { globalProps } from "../../utilities/globalProps";
import { DraggableContext } from "../context";
const DraggableContainer = (props) => {
    const { aria = {}, children, className, container, data = {}, htmlOptions = {}, id } = props;
    const { handleDragOver, handleDrop, activeContainer } = DraggableContext();
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const classes = classnames(buildCss("pb_draggable_container"), `${activeContainer === container ? "active" : ""}`, globalProps(props), className);
    return (_createElement("div", Object.assign({}, ariaProps, dataProps, htmlProps, { className: classes, id: id, key: container, onDragOver: (e) => handleDragOver(e, container), onDrop: () => handleDrop(container) }), children));
};
export default DraggableContainer;
//# sourceMappingURL=DraggableContainer.js.map