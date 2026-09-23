import React, { useEffect, useState } from 'react'
import FilterSingle, { FilterSingleProps } from './FilterSingle'
import FilterDouble, { FilterDoubleProps } from './FilterDouble'
import FilterSidebar, { FilterSidebarProps } from './FilterSidebar'
import FilterSection from './FilterSection'

const STACKED_MEDIA_QUERY = '(max-width: 767px)'

type FilterProps =
  | (FilterSingleProps & {
      double?: boolean,
      responsive?: 'stacked',
    })
  | (FilterDoubleProps & {
      double?: boolean,
      responsive?: 'stacked',
    })
  | (FilterSidebarProps & {
    variant?: null | 'sidebar',
  })

const useStackedBreakpoint = (enabled: boolean): boolean => {
  const [isBelowMd, setIsBelowMd] = useState(false)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia(STACKED_MEDIA_QUERY)
    const updateMatch = () => setIsBelowMd(mediaQuery.matches)

    updateMatch()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMatch)
      return () => mediaQuery.removeEventListener('change', updateMatch)
    }

    mediaQuery.addListener(updateMatch)
    return () => mediaQuery.removeListener(updateMatch)
  }, [enabled])

  return isBelowMd
}

const Filter = ({
  double = false,
  responsive,
  variant,
  ...templateProps
  }: FilterProps): React.ReactElement => {
  const isStackedViewport = useStackedBreakpoint(responsive === 'stacked')
  const useDouble = responsive === 'stacked' ? isStackedViewport : double === true
  // Opt-in class for stacked overflow/layout containment without
  // changing default double consumers.
  const stackedClassName = responsive === 'stacked' && useDouble
    ? 'pb_filter_responsive_stacked'
    : undefined

  const displayFilter = () => {
    if (variant === 'sidebar') {
      return (
        <FilterSidebar {...templateProps} />
      )
    }
    if (useDouble) {
      return (
        <FilterDouble
            className={stackedClassName}
            {...templateProps}
        />
      )
    } else {
      return (
        <FilterSingle {...templateProps} />
      )
    }
  }
  return (
    <>
      {displayFilter()}
    </>
  )
}

Filter.Section = FilterSection

export default Filter
