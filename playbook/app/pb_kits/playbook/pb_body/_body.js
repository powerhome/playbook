import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from 'classnames';
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props';
import { deprecatedProps, globalProps } from '../utilities/globalProps';
import Highlight from '../pb_highlight/_highlight';
const Body = (props) => {
    if (props.variant)
        deprecatedProps(); //status prop is deprecated, use color instead please
    const { aria = {}, children, className, color = '', data = {}, highlightedText = [], highlighting = false, htmlOptions = {}, id = '', status = null, tag = 'div', text = '', variant = null, } = props;
    const ariaProps = buildAriaProps(aria);
    const dataProps = buildDataProps(data);
    const htmlProps = buildHtmlProps(htmlOptions);
    const classes = classnames(buildCss('pb_body_kit', color, variant, status), globalProps(props), className);
    const Tag = `${tag}`;
    return (_jsxs(Tag, Object.assign({}, ariaProps, dataProps, htmlProps, { className: classes, id: id, children: [highlighting && (_jsx(Highlight, { highlightedText: highlightedText, text: text, children: children })), !highlighting && (text || children)] })));
};
export default Body;
//# sourceMappingURL=_body.js.map