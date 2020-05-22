import React from 'react'
import { Source } from '../../'

const SourceNoicon = () => (
  <>
    <Source
        source="BJ's Johnston-208"
        type="retail"
        hideIcon
    />

    <br />
    <br />

    <Source
        source="Referral-phrg"
        type="inbound"
        hideIcon
    />

    <br />
    <br />

    <Source
        source="BJ's Future CB"
        type="user"
        hideIcon
        user={
              { name: 'Anna Black',
                image: {
                  url: 'https://randomuser.me/api/portraits/women/44.jpg',
                  },
                userId: '48582',
                }
              }
    />
  </>
)

export default SourceNoicon
