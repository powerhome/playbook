/* @flow */

import React from 'react'
import { isEmpty, map, omitBy } from 'lodash'
import { Body, Caption, Title } from '../../'

export type FilterDescription = {
  [key: string]: ?string | boolean,
}

export type CurrentFiltersProps = {
  dark: boolean,
  filters: FilterDescription,
}

const hiddenFilters = (value) => isEmpty(value) && value !== true

const CurrentFilters = ({ dark, filters }: CurrentFiltersProps) => {
  const displayableFilters = omitBy(filters, hiddenFilters)

  return (
    <div className="maskContainer">
      <If condition={isEmpty(filters)}>
        <div className="filters">
          <Body
              color="light"
              paddingLeft="xs"
              size={4}
              tag="h4"
              text="No Filter Selected"
          />
        </div>
      </If>
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
                      dark={dark}
                      size={4}
                      tag="h4"
                      text={name}
                  />
                </When>
                <Otherwise>
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
                </Otherwise>
              </Choose>
            </div>
          ))}
          <div className="right_gradient" />
        </div>
      </If>
    </div>
  )
}

export default CurrentFilters
