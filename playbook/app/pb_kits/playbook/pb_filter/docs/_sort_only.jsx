import React from 'react'
import { Filter } from '../../'

const SortOnly = (props) => (
  <Filter
      sortOptions={{
        popularity: 'Popularity',
        // eslint-disable-next-line
        manager_title: 'Manager\'s Title',
        // eslint-disable-next-line
        manager_name: 'Manager\'s Name',
      }}
      sortValue={[{ name: 'popularity', dir: 'desc' }]}
      {...props}
  />
)

export default SortOnly
