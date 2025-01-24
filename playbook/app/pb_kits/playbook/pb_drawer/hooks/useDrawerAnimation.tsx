import { useState, useEffect } from 'react'

export const useDrawerAnimation = (isOpen: boolean) => {
  const [animationState, setAnimationState] = useState('')

  useEffect(() => {
    if (isOpen) {
      setAnimationState('afterOpen')
    } else if (!isOpen && animationState === 'afterOpen') {
      setAnimationState('beforeClose')
      setTimeout(() => {
        setAnimationState('')
      }, 200)
    }
  }, [isOpen])

  return {
    animationState,
    isVisible: isOpen || animationState === 'beforeClose'
  }
} 