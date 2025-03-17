import React from 'react'
import { isEmpty, omitBy, map } from '../../utilities/object'

import Body from '../../pb_body/_body'
import Caption from '../../pb_caption/_caption'
import Title from '../../pb_title/_title'

export type FilterDescription = {
  [key: string]: string | null | boolean,
}

export type CurrentFiltersProps = {
  dark: boolean,
  filters: FilterDescription,
}

const hiddenFilters = (value: any) => isEmpty(value) && value !== true

const CurrentFilters = ({ dark, filters }: CurrentFiltersProps): React.ReactElement => {
  const displayableFilters = omitBy(filters, hiddenFilters)

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
            {map(displayableFilters, (value, name) => (
              <div
                  className="filter"
                  key={`filter-${name}`}
              >
                { value === true ?
                <Title
                    dark={dark}
                    size={4}
                    tag="h4"
                    text={name}
                /> :
                <div>
                  <Caption
                      dark={dark}
                      text={name}
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
            ))}
          <div className="right_gradient" />
        </div>
      }
    </div>
  )
}

export default CurrentFilters
