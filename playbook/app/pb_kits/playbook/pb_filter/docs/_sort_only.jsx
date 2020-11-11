import React from 'react'
import { Filter } from '../../'

const SortOnly = (props) => (
  <Filter
      {...props}
      background={false}
      sortOptions={{
        popularity: 'Popularity',
        // eslint-disable-next-line
        manager_title: 'Manager\'s Title',
        // eslint-disable-next-line
        manager_name: 'Manager\'s Name',
      }}
      sortValue={[{ name: 'manager_title', dir: 'desc' }]}
  />
)

export default SortOnly
