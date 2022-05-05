/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import reactElementToJSXString from 'react-element-to-jsx-string'

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'

SyntaxHighlighter.registerLanguage('javascript', js)

const JSX_STRING_OPTIONS = {
  filterProps: ['key', 'example'],
}

type CodeExampleType = {children?: React.ReactChild[] | React.ReactChild | any}

const CodeExample = ({ children }: CodeExampleType) => {
  const exampleInUse = children.length ? children.map((child) =>
    reactElementToJSXString(child, JSX_STRING_OPTIONS)) :
    reactElementToJSXString(children, JSX_STRING_OPTIONS)
  return (
    <SyntaxHighlighter
        customStyle={{
          backgroundColor: 'transparent',
        }}
        language="javascript"
        style={a11yDark}
    >
      {exampleInUse}
    </SyntaxHighlighter>
  )
}

export default CodeExample
