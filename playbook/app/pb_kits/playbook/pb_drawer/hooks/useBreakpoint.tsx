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
  openBreakpoint?: BreakpointSize
  closeBreakpoint?: BreakpointSize
  triggerId?: string
}

export const useBreakpoint = ({ 
  openBreakpoint = 'none',
  closeBreakpoint = 'none',
  triggerId 
}: UseBreakpointProps) => {
  const [isOpenBreakpointOpen, setIsOpenBreakpointOpen] = useState(false)
  const [isUserClosed, setIsUserClosed] = useState(false)

  useEffect(() => {
    if (openBreakpoint === 'none' && closeBreakpoint === 'none') return

    const handleResize = () => {
      const width = window.innerWidth
      
      if (openBreakpoint !== 'none') {
        const openBreakpointWidth = breakpointValues[openBreakpoint]
        if (width >= openBreakpointWidth) {
          setIsOpenBreakpointOpen(true)
        } else {
          setIsOpenBreakpointOpen(false)
          setIsUserClosed(false)
        }
      }

      if (closeBreakpoint !== 'none') {
        const closeBreakpointWidth = breakpointValues[closeBreakpoint]
        if (width < closeBreakpointWidth) {
          setIsOpenBreakpointOpen(false)
        } else {
          setIsOpenBreakpointOpen(true)
        }
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
  }, [openBreakpoint, closeBreakpoint, triggerId, isOpenBreakpointOpen])

  return {
    isOpenBreakpointOpen,
    isUserClosed,
    setIsUserClosed
  }
} 