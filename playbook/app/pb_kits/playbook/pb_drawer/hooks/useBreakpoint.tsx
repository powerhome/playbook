import { useState, useEffect } from 'react'

export const breakpointValues = {
  none: 0,
  xs: 575,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1400,
} as const

type BreakpointSize = keyof typeof breakpointValues

interface UseBreakpointProps {
  breakpoint?: BreakpointSize
  triggerId?: string
}

export const useBreakpoint = ({ 
  breakpoint = 'none',
  triggerId 
}: UseBreakpointProps) => {
  const [isOpenBreakpointOpen, setIsOpenBreakpointOpen] = useState(false)
  const [isUserClosed, setIsUserClosed] = useState(false)

  useEffect(() => {
    if (breakpoint === 'none') return

    const handleResize = () => {
      const width = window.innerWidth
      
        const openBreakpointWidth = breakpointValues[breakpoint]
        if (width >= openBreakpointWidth) {
          setIsOpenBreakpointOpen(true)
        } else {
          setIsOpenBreakpointOpen(false)
          setIsUserClosed(false)
        }

      // Handle menu button visibility
      if (triggerId) {
        const menuButton = document.getElementById(triggerId)
        if (menuButton) {
          menuButton.style.display = isOpenBreakpointOpen ? 'none' : ''
        }
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint, triggerId, isOpenBreakpointOpen])

  return {
    isOpenBreakpointOpen,
    isUserClosed,
    setIsUserClosed
  }
} 