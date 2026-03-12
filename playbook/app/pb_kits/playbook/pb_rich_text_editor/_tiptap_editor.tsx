import React from 'react'
import classnames from 'classnames'

import EditorToolbar from './TipTap/Toolbar'

type TipTapEditorProps = {
    children?: React.ReactNode | React.ReactNode[],
    editor: unknown,
    extensions?: { [key: string]: string }[],
    inputHeight?: 'sm' | 'md' | 'lg',
    inputMinHeight?: 'sm' | 'md' | 'lg',
    shouldShowToolbar: boolean,
    simple?: boolean,
    sticky?: boolean,
}

const TipTapEditor = ({
    children,
    editor,
    extensions,
    inputHeight,
    inputMinHeight,
    shouldShowToolbar,
    simple = false,
    sticky = false,
}: TipTapEditorProps): React.ReactElement => {
    return (
        <div
            className={classnames(
                'pb_rich_text_editor_advanced_container',
                {
                    [`input_height_${inputHeight}`]: !!inputHeight,
                    [`input_min_height_${inputMinHeight}`]: !!inputMinHeight,
                    'toolbar-active': shouldShowToolbar,
                }
            )}
        >
            {shouldShowToolbar && (
                <EditorToolbar
                    editor={editor}
                    extensions={extensions}
                    simple={simple}
                    sticky={sticky}
                />
            )}
            {children}
        </div>
    )
}

export default TipTapEditor
