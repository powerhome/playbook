/* @flow */

import React, { useState } from 'react'
import {
  Button,
  Caption,
  Card,
  CircleIconButton,
  Flex,
  Icon,
  List,
  ListItem,
  PbReactPopover,
  SectionSeparator,
  Title,
  TitleCount,
} from '../'

type FilterProps = {
  background?: Boolean,
  className?: String,
  data?: String,
  id?: String,
  children?: React.Node,
  filters?: Array<Hash>,
  results?: Number,
  sortMenu?: Array<Hash>,
  template?: 'default' | 'filter_only' | 'sort_only' | 'single'
}

const Filter = ({
  background = true,
  className = 'pb_filter_kit',
  data,
  filters = [{}],
  id,
  children,
  results,
  sortMenu = null,
  template = 'default',
}: FilterProps) => {
  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [showSortOptions, setShowSortOptions] = useState(false)
  const handleToggleFilters = () => {
    setShowFilterOptions(!showFilterOptions)
  }
  const handleToggleSort = () => {
    setShowSortOptions(!showSortOptions)
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

  const Filters = () => (
    <If condition={template != 'sort_only' && filters != null}>
      <PbReactPopover
          closeOnClick="outside"
          offset
          placement="bottom"
          reference={filterButton}
          show={showFilterOptions}
      >
        <div className="pb-form">
          {children}
        </div>

      </PbReactPopover>
      <div className="maskContainer">
        <div className="filters">
          <div className="left_gradient" />
          { filters.map((item, index) => (
            <div
                className="filter"
                key={index}
            >
              <Caption text={item.name} />
              <Title
                  size={4}
                  tag="h4"
                  text={item.value}
              />
            </div>
          ))}
          <div className="right_gradient" />
        </div>
      </div>
    </If>
  )

  const activeSort = () => {
    return (
      sortMenu.map((item) => (
        item.active ? item.item : null
      ))
    )
  }

  const activeDirection = () => {
    let direction
    sortMenu.map((item) => {
      item.active ? direction = item.direction : null
    })
    const icon = direction == 'asc' ? 'sort-amount-up' : 'sort-amount-down'
    return icon
  }

  const sortButton = (
    <If condition={sortMenu != null}>
      <Button
          id="sort-button"
          onClick={handleToggleSort}
          variant="link"
      >
        {activeSort()}
        <Icon
            fixedWidth
            icon={`${activeDirection()}`}
        />
      </Button>
    </If>
  )
  const Results = () => {
    const resultsText = results > 1 ? 'Results' : 'Result'
    return (
      <If condition={results != undefined}>
        <If condition={template != 'default'}>
          <Caption
              className="filter-results"
              size="xs"
              text={`${results} ${resultsText}`}
          />
          <Else />
          <TitleCount
              align="center"
              count={results}
              title={`${resultsText}:`}
          />
        </If>
      </If>
    )
  }
  const Sort = () => (
    <If condition={template != 'filter_only'}>
      <Flex
          orientation="row"
          vertical="center"
      >
        <If condition={template == 'default'}>
          <Caption text="sort by:" />
        </If>
        <PbReactPopover
            closeOnClick="outside"
            offset
            placement="bottom"
            reference={sortButton}
            show={showSortOptions}
        >
          <List>
            {sortMenu ? sortMenu.map((item) => (
              <ListItem key={item.item}>
                <Button
                    link={item.link}
                    text={item.item}
                    variant="link"
                />
              </ListItem>
          )) : null}

          </List>
        </PbReactPopover>
      </Flex>
    </If>
  )
  const Core = () => (
    <>
      <Flex
          orientation="row"
          vertical="center"
      >
        <Filters />
        <If condition={template != 'default'}>
          <Results />
          <Sort />
        </If>
      </Flex>
      <If condition={template == 'default'}>
        <SectionSeparator />
        <Flex
            className="filter-bottom"
            orientation="row"
            spacing="between"
            vertical="center"
        >
          <Results />
          <Sort />
        </Flex>
      </If>
    </>
  )
  return (
    <div
        className={className}
        data={data}
        id={id}
    >
      <If condition={background}>
        <Card padding="none">
          <Core />
        </Card>
        <Else />
        <Core />
      </If>
    </div>
  )
}

export default Filter
