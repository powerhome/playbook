import React, { useEffect, useState } from 'react'
import usePBCopy from '../../pb_copy_button/usePBCopy'
import Body from '../../pb_body/_body'
import Textarea from '../../pb_textarea/_textarea'
import Tooltip from '../../pb_tooltip/_tooltip'

const CopyButtonHook = ({...props}) => {
  // This is how you can use the copy button hook to copy text to the clipboard
  // eslint-disable-next-line no-unused-vars
  const [copied, copyToClipboard] = usePBCopy({ from: 'hookbody' })
  // I added a tooltip so it looks better in the ui
  const [showTooltip, setShowTooltip] = useState(false)

  const handleCopy = () => {
    copyToClipboard()
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 1500)
  }

  useEffect(() => {
    const el = document.getElementById('hookbody')
    if (!el) return

    el.addEventListener('click', handleCopy)
    return () => {
      el.removeEventListener('click', handleCopy)
    }
  }, [copyToClipboard])

  return (
    <div>
      <Tooltip
          delay={{ close: 1000 }}
          forceOpenTooltip={showTooltip}
          placement="top"
          showTooltip={false}
          text="Copied!"
      >
        <Body
            cursor="pointer"
            id="hookbody"
            text="I'm a custom copy hook! Click this body to copy this text!"
        />
      </Tooltip>

      <Textarea
          {...props}
          placeholder="Paste here"
      />
    </div>
  )
}

export default CopyButtonHook
