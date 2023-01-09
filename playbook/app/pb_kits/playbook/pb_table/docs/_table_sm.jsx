/*
I tried 4 options to pass this file as a string.
- We could use "source" from Rails as Jasper did here: https://github.com/powerhome/playbook/commit/5f01b2fcaff67c5b2944a799908681a1e1db6bc5#diff-9933dfd1f79c7c87374bd19e7575b231da08f834b3360d7c02e6dc1d0fd5d100
- We could use MDX lib to serialize the code: https://github.com/hashicorp/next-mdx-remote
- We could use raw-loader from Asset Modules: https://webpack.js.org/guides/asset-modules/
- Or we could just export the string in the file as I did below.

But even so, in the end, we would have to change the document a little bit to turn it into "real code" without errors.

For example: for this one, I had to remove the parameter "props" (because we were not using it) and change the way that we import the component Table from Playbook.
*/
import React from 'react'

import Table from '../_table'

const TableSm = (props) => {
  return (
    <Table
        size="sm"
        {...props}
    >
      <thead>
        <tr>
          <th>{'Column 1'}</th>
          <th>{'Column 2'}</th>
          <th>{'Column 3'}</th>
          <th>{'Column 4'}</th>
          <th>{'Column 5'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
        <tr>
          <td>{'Value 1'}</td>
          <td>{'Value 2'}</td>
          <td>{'Value 3'}</td>
          <td>{'Value 4'}</td>
          <td>{'Value 5'}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TableSm