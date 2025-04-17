import React, { useEffect } from 'react'
import useCopy from '../../pb_copy_button/usePBCopy'
import Body from '../../pb_body/_body'
import Textarea from '../../pb_textarea/_textarea'

const CopyButtonHook = props => {
  const [, copy] = useCopy({ from: 'hookbody' })

  useEffect(() =>
    document
      .getElementById('hookbody')
      ?.addEventListener('mouseenter', copy),
  [copy])

  return (
    <div>
      <Body
          cursor='pointer'
          id="hookbody"
          text="Hover to copy this body text!"
      />
      <Textarea 
          {...props}
          placeholder="Paste here"
      />
    </div>
  )
}

export default CopyButtonHook
