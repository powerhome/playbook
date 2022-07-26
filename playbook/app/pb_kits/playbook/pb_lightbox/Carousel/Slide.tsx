/* @flow */

import React from 'react'
import { noop } from 'lodash'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import Image from '../../pb_image/_image'

type SlideType = {
  alt?: string,
  current?: number,
  onClick: () => void,
  onChange?: (index: number) => void,
  onZoom: (zoom: boolean) => void,
  zooming: boolean,
  url: string,
}

export default function Slide({
  alt,
  onClick = noop,
  onZoom = noop,
  url,
  zooming = false,
}: SlideType): React.ReactElement {
  const handlePinchingStop = ({state}: {state: any}) => {
    const isZooming = state.scale > 1
    onZoom(isZooming)
  }

  return (
    <TransformWrapper
        doubleClick={{ mode: 'reset' }}
        initialScale={1}
        onPinchingStop={handlePinchingStop}
        panning={{ disabled: !zooming }}
    >
      <button
          className="Slide"
          onClick={onClick}
          onDoubleClick={() => onZoom(false)}
          tabIndex={-1}
      >
        <TransformComponent wrapperClass="TransformComponent">
          <Image
              alt={alt}
              url={url}
              zIndex={3}
          />
        </TransformComponent>
      </button>
    </TransformWrapper>
  )
}
