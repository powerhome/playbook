/* @flow */

import React from 'react'
import { isEmpty, map, omitBy } from 'lodash'
import { Caption, Title, Body } from '../../'

export type FilterDescription = {
  [key: string]: ?string | boolean,
}

export type CurrentFiltersProps = {
  filters: FilterDescription,
}

const hiddenFilters = (value) => isEmpty(value) && value !== true

const CurrentFilters = ({ filters }: CurrentFiltersProps) => {
  const displayableFilters = omitBy(filters, hiddenFilters)

  return (
    <div className="maskContainer">
      <If condition={!isEmpty(filters)}>
        <div className="filters">
          <div className="left_gradient" />
          {map(displayableFilters, (value, name) => (
            <div
                className="filter"
                key={`filter-${name}`}
            >
              <Choose>
                <When condition={value === true}>
                  <Title
                      size={4}
                      tag="h4"
                      text={name}
                  />
                </When>
                <Otherwise>
                  <Caption text={name} />
                  <Title
                      size={4}
                      tag="h4"
                      text={value}
                  />
                </Otherwise>
              </Choose>
            </div>
          ))}
          <div className="right_gradient" />
        </div>
        <Else />
        <div className="filters">
          <Body
              paddingLeft="xs"
              text="No Filter Selected"
              color="light"
          />
        </div>
      </If>

    </div>
  )
}

export default CurrentFilters
