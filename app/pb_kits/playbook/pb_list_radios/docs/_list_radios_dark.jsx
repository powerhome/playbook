import React from 'react'
import { ListItem, ListRadioItem, ListRadios } from '../../'

const ListRadiosDefault = () => {
  return (

    <div>
      <ListRadios
          dark
      >
        <ListItem>
          <ListRadioItem
              defaultChecked={false}
              name="custom2"
          >
            {'Unselected'}
          </ListRadioItem>
        </ListItem>
        <ListItem>
          <ListRadioItem
              defaultChecked
              name="custom2"
          >
            {'Selected'}
          </ListRadioItem>
        </ListItem>
        <ListItem>
          <ListRadioItem
              defaultChecked={false}
              name="custom2"
              value="Hover"
          >
            {'Hover'}
          </ListRadioItem>
        </ListItem>
        <ListItem>
          <ListRadioItem
              defaultChecked={false}
              name="custom2"
          >
            {'Unselected Last'}
          </ListRadioItem>
        </ListItem>
      </ListRadios>
    </div>

  )
}

export default ListRadiosDefault
