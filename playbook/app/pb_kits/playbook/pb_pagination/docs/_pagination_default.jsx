import React from 'react'

import Pagination from '../_pagination'

const PaginationDefault = (props) => (
  <>
  {"hello"}
     <Pagination
         defaultPage={1}
         pageRange={6}
         totalPages={10}
         {...props}
      />
  </>
)

export default PaginationDefault
