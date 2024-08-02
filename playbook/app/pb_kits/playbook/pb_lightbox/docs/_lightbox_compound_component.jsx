import React, { useState } from 'react'
import { Flex, Image } from 'playbook-ui'
import Lightbox from '../_lightbox.tsx'

const LightboxCompoundComponent = (props) => {
  const photos = [
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1501045337096-542a73dafa4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2052&q=80',
    'https://images.unsplash.com/photo-1563693998336-93c10e5d8f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80,',
  ]
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [showLightbox, toggleShowLightbox] = useState(false)

  const handleCloseLightbox = () => {
    toggleShowLightbox(!showLightbox)
    setSelectedPhoto(null)
  }

  const onPhotoClick = (photo) => {
    toggleShowLightbox(!showLightbox)
    setSelectedPhoto(photo)
  }

  const exampleStyles = {
    width: "100%",
    overflow: "auto"
  }

  return (
    <>
      <div>
        {showLightbox ? (
          <Lightbox
              description='Description Content Goes Here.'
              initialPhoto={selectedPhoto}
              onClose={handleCloseLightbox}
              photos={photos}
              title='Windows, Sidings, & Gutters'
              {...props}
          />
        ) : (
          <div className="PhotoViewer"
              style={exampleStyles}
          >
            <Flex>
              {photos.map((photo, index) => {
                return (
                  <div
                      key={index}
                      onClick={() => onPhotoClick(index)}
                  >
                    <Image
                        cursor="pointer"
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

export default LightboxCompoundComponent
