import React from 'react'

import Source from '../_source'

const SourceTypes = (props) => (
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
        source="B.B.B. Outbound"
        type="outbound"
        {...props}
    />

    <br />
    <br />

    <Source
        source="Contractor.com"
        type="prospecting"
        {...props}
    />

    <br />
    <br />

    <Source
        source="Beards, Beers and Brats"
        type="events"
        {...props}
    />

    <br />
    <br />

    <Source
        source="BJ's Johnston-208"
        type="referral"
        {...props}
    />

    <br />
    <br />

    <Source
        source="Employee Referral"
        type="referral"
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

export default SourceTypes
