import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonPlacement = () => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/8/88/Danny_DeVito_cropped_and_edited_for_brightness.jpg"
        name="Danny Devito"
        placement="bottom_left"
    />
    <AvatarActionButton
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/8/88/Danny_DeVito_cropped_and_edited_for_brightness.jpg"
        name="Danny Devito"
        placement="bottom_right"
    />
    <AvatarActionButton
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/8/88/Danny_DeVito_cropped_and_edited_for_brightness.jpg"
        name="Danny Devito"
        placement="top_left"
    />
    <AvatarActionButton
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/8/88/Danny_DeVito_cropped_and_edited_for_brightness.jpg"
        name="Danny Devito"
        placement="top_right"
    />
  </div>
)

export default AvatarActionButtonPlacement
