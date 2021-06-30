import React from 'react'

import Source from '../_source'

const SourceNoicon = (props) => (
  <>
    <Source
        hideIcon
        source="BJ's Johnston-208"
        type="retail"
        {...props}
    />

    <br />
    <br />

    <Source
        hideIcon
        source="Referral-phrg"
        type="inbound"
        {...props}
    />

    <br />
    <br />

    <Source
        hideIcon
        source="BJ's Future CB"
        type="user"
        user={
              { name: 'Anna Black',
                image: {
                  url: 'https://randomuser.me/api/portraits/women/44.jpg',
                  },
                userId: '48582',
                }
              }
        {...props}
    />
  </>
)

export default SourceNoicon
