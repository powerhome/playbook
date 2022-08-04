import { useEffect, useState } from 'react'

export const useKbdControls = (api: {[key: string]: () => void}): string => {
  const [cmdKey, setCmdKey] = useState('')

  useEffect(() => {
    const handleKeyDown = ({key}: {key: string}) => {
      const keyCmd = key.toLowerCase()
      setCmdKey(keyCmd)

      switch(keyCmd) {
        case 'escape': {
          api.onClose()
          break
        }
        case 'arrowleft': {
          api.onArrowLeft()
          break
        }
        case 'arrowright': {
          api.onArrowRight()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [api])
  return cmdKey
}
