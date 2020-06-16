import React from 'react'

import { Currency, List, ListItem, Title } from '../../'

const ListLayoutLeft = () => {
  return (
    <>
      <List
          layout="left"
      >
        <ListItem>
          <Title
              size={4}
              text="Label"
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
          />
        </ListItem>
      </List>
    </>
  )
}

export default ListLayoutLeft
