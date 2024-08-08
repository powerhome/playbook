import React from 'react'

import Pagination from '../_pagination'

const PaginationDefault = (props) => {

    return (
      <>
        <Pagination
            current={1}
            range={5}
            total={10}
            {...props}
          />
      </>
    )
}

export default PaginationDefault
