import { useEffect } from 'react'

export default function useUnscrollableBody() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'initial'
    }
  }, [])
}
