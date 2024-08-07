import React from 'react'

import Pagination from '../_pagination'

const PaginationDefault = (props) => {

    return (
  <>
     <Pagination
         defaultPage={3}
         pageRange={5}
         totalPages={10}
         {...props}
      />
  </>
    )
}

export default PaginationDefault
