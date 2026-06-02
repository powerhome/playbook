import React, { useEffect, useState } from 'react'
import { isEmpty, omitBy, map } from '../../utilities/object'

import Body from '../../pb_body/_body'
import Caption from '../../pb_caption/_caption'
import Title from '../../pb_title/_title'
import InteractiveFilter, {
  InteractiveFilterConfig,
  labelFor,
} from './InteractiveFilter'

export type FilterDescription = {
  [key: string]: string | null | boolean,
}

export type InteractiveFilters = {
  [key: string]: InteractiveFilterConfig,
}

export type CurrentFiltersProps = {
  dark: boolean,
  filters: FilterDescription,
  interactiveFilters?: InteractiveFilters,
}

const hiddenFilters = (value: any) => isEmpty(value) && value !== true
const INTERACTIVE_FILTER_BREAKPOINT = 960
const MAX_INTERACTIVE_FILTERS = 4

const supportsInteractiveFilters = () =>
  typeof window === 'undefined' ||
  typeof window.matchMedia !== 'function' ||
  window.matchMedia(`(min-width: ${INTERACTIVE_FILTER_BREAKPOINT}px)`).matches

const CurrentFilters = ({
  dark,
  filters,
  interactiveFilters = {},
}: CurrentFiltersProps): React.ReactElement => {
  const displayableFilters = omitBy(filters, hiddenFilters)
  const [interactiveFiltersEnabled, setInteractiveFiltersEnabled] = useState(
    supportsInteractiveFilters
  )

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return

    const mediaQuery = window.matchMedia(
      `(min-width: ${INTERACTIVE_FILTER_BREAKPOINT}px)`
    )
    const handleChange = () => setInteractiveFiltersEnabled(mediaQuery.matches)

    handleChange()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  return (
    <div className="maskContainer">
      { isEmpty(filters) &&
      <div className="filters">
        <Body
            color="light"
            paddingLeft="xs"
            size={4}
            tag="span"
            text="No Filter Selected"
        />
      </div>
      }
      { !isEmpty(filters) &&
        <div className="filters">
          <div className="left_gradient" />
            {map(displayableFilters, (value, name, collection) => {
              const interactiveConfig = interactiveFilters[name]
              const filterNames = Object.keys(collection)
              const currentFilterIndex = filterNames.indexOf(String(name))
              const filterValue = value === true ? '' : String(value)
              const interactiveValue =
                interactiveConfig?.value !== undefined
                  ? interactiveConfig.value
                  : filterValue
              const displayValue = interactiveConfig
                ? labelFor(interactiveConfig, interactiveValue)
                : value
              const interactiveFilterIndex = filterNames
                .slice(0, currentFilterIndex + 1)
                .filter((key) => interactiveFilters[key]).length - 1
              const isInteractive = Boolean(
                interactiveFiltersEnabled &&
                interactiveConfig &&
                interactiveFilterIndex < MAX_INTERACTIVE_FILTERS
              )

              return (
                <div
                    className={`filter${isInteractive ? ' interactive' : ''}`}
                    key={`filter-${name}`}
                >
                  { isInteractive ?
                    <InteractiveFilter
                        config={interactiveConfig}
                        dark={dark}
                        editorValue={interactiveConfig.editorValue}
                        name={String(name)}
                        value={interactiveValue}
                    /> :
                    displayValue === true ?
                    <Title
                        dark={dark}
                        size={4}
                        tag="h4"
                        text={`${name}`}
                    /> :
                    <div>
                      <Caption
                          dark={dark}
                          text={`${name}`}
                      />
                      <Title
                          dark={dark}
                          size={4}
                          tag="h4"
                          text={displayValue}
                      />
                    </div>
                  }
                </div>
              )
            })}
          <div className="right_gradient" />
        </div>
      }
    </div>
  )
}

export default CurrentFilters
