import React, { useState } from 'react'

import TextInput from '../../pb_text_input/_text_input'

const TextInputEmojiMask = (props) => {
  const [basicValue, setBasicValue] = useState('')

  return (
    <div>
      <TextInput
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

export default TextInputEmojiMask


