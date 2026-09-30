/* eslint-disable react/no-multi-comp */

import React, { useEffect, useMemo, useState } from 'react'

import Background from '../../pb_background/_background'
import Table from '../_table'

const DATA_ROWS = [
  { territory: 'North', firstname: 'John', lastname: 'Doe', age: 30, job: 'Engineer' },
  { territory: 'South', firstname: 'Alice', lastname: 'Smith', age: 28, job: 'Designer' },
  { territory: 'East', firstname: 'Mike', lastname: 'Johnson', age: 35, job: 'Manager' },
  { territory: 'West', firstname: 'Sarah', lastname: 'Brown', age: 29, job: 'Developer' },
  { territory: 'Central', firstname: 'David', lastname: 'Wilson', age: 32, job: 'Analyst' },
]

const TABLE_ID = 'table-header'

const getSortFromSearch = () => {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get('sort') || ''
}

const sortLink = (sortKey) => `?sort=${sortKey}#${TABLE_ID}`

const sortKeyFromHref = (href) => {
  if (!href) return null

  try {
    return new URL(href, window.location.origin).searchParams.get('sort')
  } catch {
    return null
  }
}

const syncSortToUrl = (sortKey) => {
  const params = new URLSearchParams(window.location.search)
  params.set('sort', sortKey)
  const search = params.toString()
  const next = `${window.location.pathname}?${search}#${TABLE_ID}`
  window.history.replaceState(null, '', next)
}

const sortRows = (rows, sort) => {
  if (!sort) return rows

  const sortParam = sort.replace(/_(asc|desc)$/, '')
  const sortDirection = sort.endsWith('_asc') ? 1 : -1

  return [...rows].sort((a, b) => {
    const valueA = a[sortParam]
    const valueB = b[sortParam]
    if (valueA === valueB) return 0
    return sortDirection * (valueA > valueB ? 1 : -1)
  })
}

const isClickFromThisExample = (anchor, table) => {
  if (table.contains(anchor)) return true

  // Dropdown menus portal to document.body; tie them back via the header id.
  const ownerId = anchor
      .closest('[data-pb-table-header]')
      ?.getAttribute('data-pb-table-header')

  return !!(ownerId && table.querySelector(`#${CSS.escape(ownerId)}`))
}

const TableHeaderDoc = (props) => {
  const [sort, setSort] = useState(getSortFromSearch)
  const dataRows = useMemo(() => sortRows(DATA_ROWS, sort), [sort])

  useEffect(() => {
    const table = document.getElementById(TABLE_ID)
    if (!table) return undefined

    const onClick = (event) => {
      const anchor = event.target.closest('a[href]')
      if (!anchor || !isClickFromThisExample(anchor, table)) return

      const nextSort = sortKeyFromHref(anchor.getAttribute('href'))
      if (!nextSort) return

      event.preventDefault()
      setSort(nextSort)
      syncSortToUrl(nextSort)
    }

    // Capture phase so we can preventDefault before React Router navigates.
    // Still scoped to this table / its portaled dropdown via isClickFromThisExample.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return (
    <Table
        dataTable
        id={TABLE_ID}
        verticalBorder
        {...props}
    >
      <Table.Head>
        <Table.Row>
          <Table.Header
              id="territory"
              sortMenu={[
                {
                  active: sort === 'territory_asc',
                  direction: 'asc',
                  item: 'Territory',
                  link: sortLink('territory_asc'),
                },
                {
                  active: sort === 'territory_desc',
                  direction: 'desc',
                  item: 'Territory',
                  link: sortLink('territory_desc'),
                },
              ]}
              text="Territory"
          />
          <Table.Header
              colSpan={2}
              id="name"
              sortMenu={[
                {
                  active: sort === 'firstname_desc',
                  direction: 'desc',
                  item: 'First Name',
                  link: sortLink('firstname_desc'),
                },
                {
                  active: sort === 'firstname_asc',
                  direction: 'asc',
                  item: 'First Name',
                  link: sortLink('firstname_asc'),
                },
                {
                  active: sort === 'lastname_desc',
                  direction: 'desc',
                  item: 'Last Name',
                  link: sortLink('lastname_desc'),
                },
                {
                  active: sort === 'lastname_asc',
                  direction: 'asc',
                  item: 'Last Name',
                  link: sortLink('lastname_asc'),
                },
              ]}
              text="Full Name"
          />
          <Table.Header
              id="age"
              sortMenu={[
                {
                  active: sort === 'age_desc',
                  direction: 'desc',
                  item: 'Age Descending',
                  link: sortLink('age_desc'),
                },
                {
                  active: sort === 'age_asc',
                  direction: 'asc',
                  item: 'Age Ascending',
                  link: sortLink('age_asc'),
                },
              ]}
              text="Age"
          />
          <Table.Header text="Job Title" />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {dataRows.map((row) => (
          <Table.Row key={`${row.territory}-${row.firstname}-${row.lastname}`}>
            {Object.entries(row).map(([key, value]) => (
              <Background
                  backgroundColor={sort && sort.startsWith(key) ? 'info_subtle' : 'card_light'}
                  key={key}
                  tag="td"
                  textAlign={typeof value === 'number' ? 'right' : undefined}
              >
                {value}
              </Background>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default TableHeaderDoc
