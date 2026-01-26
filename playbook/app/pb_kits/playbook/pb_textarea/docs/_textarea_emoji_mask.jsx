import React, { useState } from 'react'

import Textarea from '../../pb_textarea/_textarea'

const TextareaEmojiMask = (props) => {
  const [basicValue, setBasicValue] = useState('')

  return (
    <div>
      <Textarea
          emojiMask
          label="Emoji Mask"
          onChange={({ target }) => setBasicValue(target.value)}
          placeholder="Try typing or pasting emojis..."
          value={basicValue}
          {...props}
      />
    </div>
  )
}

export default TextareaEmojiMask


