import React from 'react'

import { Currency, List, ListItem, Title } from '../../'

const ListLayoutLeft = (props) => {
  return (
    <>
      <List
          layout="left"
          {...props}
      >
        <ListItem>
          <Title
              size={4}
              text="Label"
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>

        <ListItem>
          <Title
              size={4}
              text="Label"
              {...props}
          />
          <Currency
              amount="2,000.50"
              label="Caption"
              size="sm"
              {...props}
          />
        </ListItem>
      </List>
    </>
  )
}

export default ListLayoutLeft
