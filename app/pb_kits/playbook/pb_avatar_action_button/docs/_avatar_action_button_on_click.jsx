import React from 'react'
import { AvatarActionButton } from '../../'

const AvatarActionButtonOnClick = () => (
  <div className="pb--doc-demo-row">
    <AvatarActionButton
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/8/88/Danny_DeVito_cropped_and_edited_for_brightness.jpg"
        linkUrl="https://www.google.com"
        name="Danny Devito"
        onClick={() => alert('Obtrusive JS!')}
    />
  </div>
)

export default AvatarActionButtonOnClick
