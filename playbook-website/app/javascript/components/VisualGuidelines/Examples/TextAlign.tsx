/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'
import Example from '../Templates/Example'

const PROPVALUES = [
  'left',
  'right',
  'center',
  'justify',
  'justify-all',
  'start',
  'end',
  'match-parent',
  'initial',
  'inherit',
]

const screenSizeProps = {
  display: ['xs', 'sm', 'md', 'lg', 'xl'],
}

const TextAlign = ({
  example,
}: {
  example: string;
}) => (
  <>
    <Example
        example={example}
        globalProps={{
          textAlign: PROPVALUES,
        }}
        screenSizes={screenSizeProps}
        title="Text Align"
    />
  </>
)

export default TextAlign
