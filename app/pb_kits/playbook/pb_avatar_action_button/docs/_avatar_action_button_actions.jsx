import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonActions = () => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        action="add"
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/8/88/Danny_DeVito_cropped_and_edited_for_brightness.jpg"
        name="Danny Devito"
    />
    <AvatarActionButton
        action="remove"
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/8/88/Danny_DeVito_cropped_and_edited_for_brightness.jpg"
        name="Danny Devito"
    />
  </div>
)

export default AvatarActionButtonActions
