/* @flow */
/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import React, { useState } from 'react'
import { Flex, Image } from '../../'
import Lightbox from '../_lightbox.jsx'

const LightboxMultiple = (props) => {
  const photos = [
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
  ]
  const [selectedPhoto, setSelectedPhoto] = useState(photos[0])
  const [light, toggleLight] = useState(false)

  const handleCloseLightbox = () => {
    toggleLight(!light)
    setSelectedPhoto(null)
  }

  const onPhotoClick = (photo) => {
    toggleLight(!light)
    setSelectedPhoto(photo)
  }

  return (
    <div>
      {light ? (
        <Lightbox
            icon="times"
            iconSize="2x"
            initialPhoto={selectedPhoto}
            onClose={handleCloseLightbox}
            photos={photos}
            {...props}
        />
      ) : (
        <div className="PhotoViewer">
          <Flex>
            {photos.map((photo, index) => {
              return (
                <div
                    key={photos[index]}
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
  )
}

export default LightboxMultiple
