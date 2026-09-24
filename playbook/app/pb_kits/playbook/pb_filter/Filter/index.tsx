import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

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

const getStackedMatch = (): boolean => (
  typeof window !== 'undefined' &&
  !!window.matchMedia?.(STACKED_MEDIA_QUERY).matches
)

const useStackedBreakpoint = (enabled: boolean): boolean => {
  const [isBelowMd, setIsBelowMd] = useState(() => (enabled ? getStackedMatch() : false))

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !window.matchMedia) {
      setIsBelowMd(false)
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

  return enabled && isBelowMd
}

const Filter = ({
  double = false,
  responsive,
  variant,
  ...templateProps
  }: FilterProps): React.ReactElement => {
  const isStackedViewport = useStackedBreakpoint(responsive === 'stacked')
  const useDouble = responsive === 'stacked' ? isStackedViewport : double === true
  const { className, ...layoutProps } = templateProps
  const mergedClassName = classnames(
    responsive === 'stacked' && 'pb_filter_responsive',
    className,
  )

  const displayFilter = () => {
    if (variant === 'sidebar') {
      return (
        <FilterSidebar
            className={className}
            {...layoutProps}
        />
      )
    }
    if (useDouble) {
      return (
        <FilterDouble
            {...layoutProps}
            className={mergedClassName}
        />
      )
    } else {
      return (
        <FilterSingle
            {...layoutProps}
            className={mergedClassName}
        />
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
