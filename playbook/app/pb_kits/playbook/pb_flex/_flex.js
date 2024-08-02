import { jsx as _jsx } from "react/jsx-runtime";
import classnames from 'classnames';
import { buildCss, buildDataProps, buildHtmlProps } from '../utilities/props';
import { globalProps } from '../utilities/globalProps';
const Flex = (props) => {
    const { align = 'none', children, className, data = {}, inline = false, horizontal = 'left', htmlOptions = {}, justify = 'none', orientation = 'row', spacing = 'none', gap = 'none', rowGap = 'none', columnGap = 'none', reverse = false, vertical = 'top', wrap = false, alignSelf = 'none', } = props;
    const orientationClass = orientation !== undefined ? `orientation_${orientation}` : '';
    const justifyClass = justify !== 'none' ? `justify_content_${justify}` : `justify_content_${horizontal}`;
    const alignClass = align !== 'none' ? `align_items_${align}` : `align_items_${vertical}`;
    const inlineClass = inline === true ? 'inline' : '';
    const spacingClass = spacing !== undefined ? `spacing_${spacing}` : '';
    const gapClass = gap !== 'none' ? `gap_${gap}` : '';
    const rowGapClass = rowGap !== 'none' ? `rowGap_${rowGap}` : '';
    const columnGapClass = columnGap !== 'none' ? `columnGap_${columnGap}` : '';
    const wrapClass = wrap === true ? 'wrap' : '';
    const reverseClass = reverse === true ? 'reverse' : '';
    const alignSelfClass = alignSelf !== 'none' ? `align_self_${alignSelf}` : '';
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    return (_jsx("div", Object.assign({ className: classnames(buildCss('pb_flex_kit', orientationClass, justifyClass, alignClass, inlineClass, reverseClass, wrapClass, spacingClass, gapClass, rowGapClass, columnGapClass, alignSelfClass), globalProps(props), className) }, dataProps, htmlProps, { children: children })));
};
export default Flex;
//# sourceMappingURL=_flex.js.map