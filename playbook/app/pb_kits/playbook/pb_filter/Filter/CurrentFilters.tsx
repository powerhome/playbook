import React, { useEffect } from 'react'
import { isEmpty, omitBy, map } from '../../utilities/object'

import Body from '../../pb_body/_body'
import Caption from '../../pb_caption/_caption'
import Title from '../../pb_title/_title'
import InteractiveFilter, { InteractiveFilterConfig } from './InteractiveFilter'

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

const CurrentFilters = ({
  dark,
  filters,
  interactiveFilters = {},
}: CurrentFiltersProps): React.ReactElement => {
  const displayableFilters = omitBy(filters, hiddenFilters)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    const orphans = Object.keys(interactiveFilters).filter(
      (name) => !filters || !(name in filters)
    )
    if (orphans.length) {
      // eslint-disable-next-line no-console
      console.warn(
        `[pb_filter] interactiveFilters entries ignored — not present in \`filters\`: ${orphans
          .map((n) => `"${n}"`)
          .join(', ')}. A filter must exist in \`filters\` before it can be made interactive.`
      )
    }
  }, [filters, interactiveFilters])

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
            {map(displayableFilters, (value, name) => {
              const interactiveConfig = interactiveFilters[name]
              return (
                <div
                    className={`filter${interactiveConfig ? ' interactive' : ''}`}
                    key={`filter-${name}`}
                >
                  { interactiveConfig ?
                    <InteractiveFilter
                        config={interactiveConfig}
                        dark={dark}
                        editorValue={interactiveConfig.editorValue}
                        name={String(name)}
                        value={
                          interactiveConfig.value !== undefined
                            ? interactiveConfig.value
                            : value === true
                              ? ''
                              : (value as string)
                        }
                    /> :
                    value === true ?
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
                          text={value}
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
