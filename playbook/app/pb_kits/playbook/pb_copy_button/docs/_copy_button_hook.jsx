import React, { useEffect } from 'react'
import usePBCopy from '../../pb_copy_button/usePBCopy'
import Body from '../../pb_body/_body'
import Textarea from '../../pb_textarea/_textarea'

const CopyButtonHook = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [hasCopied, copyToClipboard] = usePBCopy({ from: 'hookbody' })
  
  useEffect(() => {
    const el = document.getElementById('hookbody')
    if (!el) return

    el.addEventListener('mouseenter', copyToClipboard)
    return () => {
      el.removeEventListener('mouseenter', copyToClipboard)
    }
  }, [copyToClipboard])
  // Copy to clipboard when the body is hovered
  
  return (
    <div>
      <Body
          cursor="pointer"
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
