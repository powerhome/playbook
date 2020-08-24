import React, {useState} from 'react'
import { ListRadios, ListRadioItem, ListItem } from '../../'


const ListRadiosDefault = () => {

return (
    <div>
      <ListRadios >
        <ListItem>
        <ListRadioItem
          defaultChecked={false}
          name="custom1"
          label="Unselected"
        />
        </ListItem>
        <ListItem>
        <ListRadioItem
          defaultChecked
          name="custom1"
          label="Selected"
        />
        </ListItem>
        <ListItem>
        <ListRadioItem
          defaultChecked={false}
          name="custom1"
          label="Hover"
        />
        </ListItem>
        <ListItem>
        <ListRadioItem
          defaultChecked={false}
          name="custom1"
          label="Unselected Last"
        />
        </ListItem>
      </ListRadios>
    </div>
  )
}

export default ListRadiosDefault
