/* @flow */
/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import React, { useState } from 'react'
import { useToggler } from '../hooks/useToggler.js'
import { Flex, Image } from '../../'
import styles from '../Lightbox/styles.scss'
import Lightbox from '../Lightbox/index.jsx'

export default function LightboxDefault() {
  const photos = [
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
  ]
  const [selectedPhoto, setSelectedPhoto] = useState(photos[0])
  const [showLightbox, toggleShowLightbox] = useToggler()

  const handleCloseLightbox = () => {
    toggleShowLightbox()
    setSelectedPhoto(null)
  }

  const onPhotoClick = (photo) => {
    toggleShowLightbox()
    setSelectedPhoto(photo)
  }

  return (
    <>
      <div className={styles.EstimatePhotoViewer}>
        {showLightbox ? (
          <Lightbox
              icon="times"
              iconSize="2x"
              initialPhoto={selectedPhoto}
              onClose={handleCloseLightbox}
              photos={photos}
          />
        ) : (
          <div className={styles.PhotoViewer}>
            <Flex>
              {photos.map((photo, index) => {
                return (
                  <div
                      key={photo[index]}
                      onClick={() => onPhotoClick(photo)}
                  >
                    <Image
                        marginRight="xl"
                        rounded
                        size="lg"
                        url={photo}
                    />

                    <div className="overlay" />
                  </div>
                )
              })}
            </Flex>
          </div>
        )}
      </div>
    </>
  )
}
