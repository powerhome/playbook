import React from 'react'
import { Source } from '../../'

const SourceDefault = (props) => (
  <>
    <Source
        source="BJ's Johnston-208"
        type="retail"
        {...props}
    />

    <br />
    <br />

    <Source
        source="Referral-phrg"
        type="inbound"
        {...props}
    />

    <br />
    <br />

    <Source
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

export default SourceDefault
