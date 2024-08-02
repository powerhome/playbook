import { jsx as _jsx } from "react/jsx-runtime";
import classnames from 'classnames';
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props';
import { deprecatedProps, globalProps } from '../utilities/globalProps';
const Caption = (props) => {
    if (props.variant)
        deprecatedProps(); //variant prop is deprecated, use color instead
    const { aria = {}, children, className, color, data = {}, htmlOptions = {}, id, size = 'md', tag = 'div', text, variant = null, } = props;
    const tagOptions = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'span',
        'div',
        'caption',
    ];
    const Tag = tagOptions.includes(tag) ? tag : 'div';
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const css = classnames(buildCss('pb_caption_kit', size, variant, color), globalProps(props), className);
    return (_jsx(Tag, Object.assign({}, ariaProps, dataProps, htmlProps, { className: css, id: id, children: text || children })));
};
export default Caption;
//# sourceMappingURL=_caption.js.map