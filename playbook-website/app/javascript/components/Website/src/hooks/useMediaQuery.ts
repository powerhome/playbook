import { useState, useEffect } from "react"

// Hook
export function useMediaQuery(query) {
  const getMatches = (query) => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState(getMatches(query))

  function handleChange() {
    setMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and whenever the window size is changed
    handleChange()

    // Listen for changes
    matchMedia.addEventListener("change", handleChange)

    return () => {
      // Clean up listener on unmount
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}
