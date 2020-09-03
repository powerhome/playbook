import React, { useEffect, useState  } from 'react'
import { Loading } from '../../'

const LoadingDefault = () => {
  // Example Code to Mimic Loading
  const [isLoading, setLoadingState] = useState(true)
  const [seconds, setSeconds] = useState(7)

  useEffect(() => {
    const timerId = setInterval(() => {
      (seconds == 0) ? setLoadingState(false) : setSeconds(seconds - 1)
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [seconds])
  // End Example

  return (
    <div>
      {'Static Example'}
      <Loading isLoading />

      <br />

      <If condition={isLoading}>
        {`This loading state demo will change in: ${seconds}`}
        <Else />
        {'Content loaded. Loading kit disappears.'}
      </If>
      <Loading isLoading={isLoading} />
    </div>
  )
}

export default LoadingDefault
