import React, { useState } from 'react'
import { Textarea } from '../../'

const TextareaCharacterCounter = () => {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(20)
  const [count3, setCount3] = useState(100)
  const [count4, setCount4] = useState(94)
  const [value1, setValue1] = useState('Counting characters!')
  const [value2, setValue2] = useState('This counter prevents the user from exceeding the maximum number of allowed characters. Just try it!')
  const [value3, setValue3] = useState('This counter alerts the user that they have exceeded the maximum number of allowed characters.')
  const [error, setError] = useState('Too many characters!')

  const handleMaxCount = (event) => {
    setCount2(event.target.value.length)
    setValue1(event.target.value)
  }

  const handleMaxCountWithBlocker = (event, maxCharacters) => {
    if (event.target.value.length <= maxCharacters) {
      setCount3(event.target.value.length)
      setValue2(event.target.value)
    }
  }

  const handleMaxCountWithError = (event, maxCharacters) => {
    if (event.target.value.length > maxCharacters) {
      setError('Too many characters!')
    } else {
      setError('')
    }

    setCount4(event.target.value.length)
    setValue3(event.target.value)
  }

  return (
    <>
      <Textarea
          characterCount={count1.toString()}
          label="Count Only"
          onChange={(event) => setCount1(event.target.value.length)}
          rows={4}
      />

      <br />

      <Textarea
          characterCount={count2.toString()}
          label="Max Characters"
          maxCharacters="100"
          onChange={() => handleMaxCount(event)}
          rows={4}
          value={value1}
      />

      <br />

      <Textarea
          characterCount={count3.toString()}
          label="Max Characters With Blocker"
          maxCharacters="100"
          onChange={() => handleMaxCountWithBlocker(event, 100)}
          rows={4}
          value={value2}
      />

      <br />

      <Textarea
          characterCount={count4.toString()}
          error={error}
          label="Max Characters with Error"
          maxCharacters="75"
          onChange={() => handleMaxCountWithError(event, 75)}
          rows={4}
          value={value3}
      />
    </>
  )
}

export default TextareaCharacterCounter
