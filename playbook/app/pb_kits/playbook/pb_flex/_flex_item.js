import { jsx as _jsx } from "react/jsx-runtime";
import classnames from 'classnames';
import { buildCss, buildHtmlProps } from '../utilities/props';
import { globalProps } from '../utilities/globalProps';
const FlexItem = (props) => {
    const { children, className, fixedSize, grow, htmlOptions = {}, shrink, flex = 'none', order = 'none', alignSelf, displayFlex } = props;
    const growClass = grow === true ? 'grow' : '';
    const displayFlexClass = displayFlex === true ? `display_flex_${displayFlex}` : '';
    const flexClass = flex !== 'none' ? `flex_${flex}` : '';
    const shrinkClass = shrink === true ? 'shrink' : '';
    const alignSelfClass = alignSelf ? `align_self_${alignSelf}` : '';
    const fixedStyle = fixedSize !== undefined ? { flexBasis: `${fixedSize}` } : null;
    const orderClass = order !== 'none' ? `order_${order}` : null;
    const htmlProps = buildHtmlProps(htmlOptions);
    return (_jsx("div", Object.assign({}, htmlProps, { className: classnames(buildCss('pb_flex_item_kit', growClass, shrinkClass, flexClass, displayFlexClass), orderClass, alignSelfClass, globalProps(props), className), style: fixedStyle, children: children })));
};
export default FlexItem;
//# sourceMappingURL=_flex_item.js.map