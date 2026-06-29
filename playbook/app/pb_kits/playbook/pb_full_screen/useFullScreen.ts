import { useState, useCallback, useEffect } from 'react'

interface UseFullScreenOptions {
  onEnter?: () => void
  onExit?: () => void
  escToExit?: boolean
}

interface UseFullScreenReturn {
  isFullscreen: boolean
  enter: () => void
  exit: () => void
  toggle: () => void
}

const useFullScreen = (options: UseFullScreenOptions = {}): UseFullScreenReturn => {
  const { onEnter, onExit, escToExit = true } = options
  const [isFullscreen, setIsFullscreen] = useState(false)

  const enter = useCallback(() => {
    setIsFullscreen(true)
    onEnter?.()
  }, [onEnter])

  const exit = useCallback(() => {
    setIsFullscreen(false)
    onExit?.()
  }, [onExit])

  const toggle = useCallback(() => {
    if (isFullscreen) {
      exit()
    } else {
      enter()
    }
  }, [isFullscreen, enter, exit])

  // ESC key handler
  useEffect(() => {
    if (!escToExit || !isFullscreen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        exit()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [escToExit, isFullscreen, exit])

  return {
    isFullscreen,
    enter,
    exit,
    toggle,
  }
}

export default useFullScreen