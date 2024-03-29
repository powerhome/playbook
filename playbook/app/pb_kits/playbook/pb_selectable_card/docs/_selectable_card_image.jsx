import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import Image from '../../pb_image/_image'
import SelectableCard from '../../pb_selectable_card/_selectable_card'

const SelectableCardImage = (props) => {
  const [selectedImage, setSelectedImage] = useState(true)
  const [unselectedImage, setUnselectedImage] = useState(false)

  return (
    <div className="pb--doc-demo-row">

      <SelectableCard
          checked={selectedImage}
          icon
          inputId="selectableImage"
          name="selectableImage"
          onChange={() => setSelectedImage(!selectedImage)}
          value="selectableImage"
          {...props}
      >
        <Image
            rounded
            size="xl"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />

        <Body>{'Add text here'}</Body>
      </SelectableCard>

      <SelectableCard
          checked={unselectedImage}
          icon
          inputId="unselectedImage"
          name="unselectedImage"
          onChange={() => setUnselectedImage(!unselectedImage)}
          value="unselectedImage"
          {...props}
      >
        <Image
            rounded
            size="xl"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </SelectableCard>

    </div>
  )
}

export default SelectableCardImage
