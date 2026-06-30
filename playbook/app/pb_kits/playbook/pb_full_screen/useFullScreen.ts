import { useState } from 'react'

const useFullScreen = (initial = false) => {
  const [isFullscreen, setIsFullscreen] = useState(initial)

  const toggleFullScreen = () => setIsFullscreen((prev) => !prev)

  return [
    isFullscreen,
    setIsFullscreen as any,
    toggleFullScreen,
  ]
}

export default useFullScreen
