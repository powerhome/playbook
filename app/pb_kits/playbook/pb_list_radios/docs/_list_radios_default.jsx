import React, {useState} from 'react'
import { ListRadios, ListRadioItem } from '../../'


const ListRadiosDefault = () => {

  const [choice, setChoice] = useState('unselected')

  const handleOnChange = ({ target }) => {
    setChoice(target.value)
  }

return (
    <div>
      <ListRadios >
        <ListRadioItem checked={choice === 'unselected'} onChange={handleOnChange} name="custom1">
          Unselected
        </ListRadioItem>
        <ListRadioItem>Selected</ListRadioItem>
        <ListRadioItem>Hover</ListRadioItem>
        <ListRadioItem>Unselected Last</ListRadioItem>
      </ListRadios>
    </div>
  )
}

export default ListRadiosDefault
