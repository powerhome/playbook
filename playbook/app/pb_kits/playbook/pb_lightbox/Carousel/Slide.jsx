/* @flow */

import React from 'react'
import { noop } from 'lodash'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import styles from './styles.scss'

type SlideType = {
  alt: string,
  current: number,
  onClick: () => void,
  onChange: (index: number) => void,
  onZoom: (zoom: number) => void,
  zooming: boolean,
  url: string,
}

export default function Slide({
  alt,
  onClick = noop,
  onZoom = noop,
  url,
  zooming = false,
}: SlideType) {
  const handlePinchingStop = (e) => {
    const isZooming = e.state.scale > 1
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
          className={styles.Slide}
          onClick={onClick}
          onDoubleClick={() => onZoom(false)}
          tabIndex={-1}
      >
        <TransformComponent className={styles.TransformComponent}>
          <img
              alt={alt}
              src={url}
          />
        </TransformComponent>
      </button>
    </TransformWrapper>
  )
}
