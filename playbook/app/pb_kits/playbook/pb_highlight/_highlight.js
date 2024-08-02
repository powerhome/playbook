/* eslint-disable */
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */
import Highlighter from 'react-highlight-words';
import classnames from 'classnames';
import { globalProps } from '../utilities/globalProps';
import { buildHtmlProps } from '../utilities/props';
const Highlight = (props) => {
    const { children, className = 'pb_highlight_kit', data = {}, highlightedText = ['highlight'], htmlOptions = {}, id = '', text = '', } = props;
    const htmlProps = buildHtmlProps(htmlOptions);
    const highlightContent = text || children;
    return (_jsx(Highlighter, Object.assign({ autoEscape: true, data: data, highlightClassName: classnames(globalProps(props), className), highlightTag: "mark", id: id, searchWords: highlightedText, textToHighlight: highlightContent }, htmlProps)));
};
export default Highlight;
//# sourceMappingURL=_highlight.js.map