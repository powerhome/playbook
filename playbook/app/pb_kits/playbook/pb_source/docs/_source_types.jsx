import React from 'react'
import { Source } from '../../'

const SourceTypes = () => (
  <>
    <Source
        source="BJ's Johnston-208"
        type="retail"
    />

    <br />
    <br />

    <Source
        source="Referral-phrg"
        type="inbound"
    />

    <br />
    <br />

    <Source
        source="B.B.B. Outbound"
        type="outbound"
    />

    <br />
    <br />

    <Source
        source="Contractor.com"
        type="prospecting"
    />

    <br />
    <br />

    <Source
        source="Beards, Beers and Brats"
        type="events"
    />

    <br />
    <br />

    <Source
        source="BJ's Johnston-208"
        type="referral"
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
    />
  </>
)

export default SourceTypes
