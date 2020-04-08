/* @flow */

import React, { useState } from 'react'
import {
  Button,
  Caption,
  Card,
  CircleIconButton,
  Flex,
  Icon,
  PbReactPopover,
  SectionSeparator,
  Title,
  TitleCount,
} from '../'

type FilterProps = {
  className?: String,
  data?: String,
  id?: String,
  children?: React.Node,
  filters?: Array<Hash>,
  sortMenu?: Array<Hash>
}

const Filter = ({
  className = 'pb_filter_kit',
  data,
  id,
  children,
}: FilterProps) => {
  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const handleToggleFilters = () => {
    setShowFilterOptions(!showFilterOptions)
  }

  const filterButton = (
    <CircleIconButton
        icon="filter"
        id="filter"
        onClick={handleToggleFilters}
        text="filter"
        variant="secondary"
    />
  )

  return (
    <div
        className={className}
        data={data}
        id={id}
    >
      <Card padding="none">
        <Flex
            orientation="row"
            vertical="center"
        >
          <PbReactPopover
              placement="bottom"
              reference={filterButton}
              show={showFilterOptions}
          >
            {children}
          </PbReactPopover>
          <div className="maskContainer">
            <div className="filters">
              <div className="left_gradient" />
              <div className="filter">
                <Caption text="{`${filters[0].name}`}" />
                <Title
                    size={4}
                    tag="h4"
                    text="name"
                />
              </div>
              <div className="right_gradient" />
            </div>
          </div>
        </Flex>
        <SectionSeparator />
        <Flex
            className="filter-bottom"
            orientation="row"
            spacing="between"
            vertical="center"
        >
          <TitleCount
              align="center"
              count={25}
              title="Results"
          />
          <Flex
              orientation="row"
              vertical="center"
          >
            <Caption text="sort by:" />
            <Button
                id="sort-button"
                text={'`${sortMenu[0].item}`'}
                variant="link"
            >
              <Icon />
            </Button>
          </Flex>
        </Flex>
      </Card>

    </div>
  )
}

export default Filter
