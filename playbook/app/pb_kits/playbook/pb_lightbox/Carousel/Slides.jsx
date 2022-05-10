/* @flow */

import { noop } from 'lodash'
import React, { useState } from 'react'

import Slide from './Slide'

type SlidesType = {
  urls: Array<string>,
  current: number,
  onChange: (index: number) => void,
  onClick: (index: number) => void,
}

export default function Slides({
  urls = [],
  current = 0,
  // onClick = noop,
  onChange = noop,
}: SlidesType) {
  const [zooming, setZooming] = useState(false)

  const handleZoom = (isZooming) => setZooming(isZooming)
  return (
    <div
        className="Slides"
    >
        <Slide
            onClick={() => onChange(current)}
            onZoom={handleZoom}
            url={urls[current]}
            zooming={zooming}
        />
    </div>
  )
}
