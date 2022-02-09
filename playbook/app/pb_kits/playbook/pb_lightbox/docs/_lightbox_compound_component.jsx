/* @flow */
/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import React, { useState } from 'react'
import { Caption, Flex, FlexItem, Image, Title } from '../../'
import Lightbox from '../_lightbox'

const LightboxCompoundComponent = (props) => {
  const photos = [
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1501045337096-542a73dafa4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2052&q=80',
    'https://images.unsplash.com/photo-1563693998336-93c10e5d8f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80,',
  ]
  const [selectedPhoto, setSelectedPhoto] = useState(photos[0])
  const [showLightbox, toggleShowLightbox] = useState(false)

  const handleCloseLightbox = () => {
    toggleShowLightbox(!showLightbox)
    setSelectedPhoto(null)
  }

  const onPhotoClick = (photo) => {
    toggleShowLightbox(!showLightbox)
    setSelectedPhoto(photo)
  }

  return (
    <>
      <div>
        {showLightbox ? (
          <Lightbox
              icon="times"
              iconSize="2x"
              initialPhoto={selectedPhoto}
              onClose={handleCloseLightbox}
              photos={photos}
              {...props}
          >
            <Lightbox.Header>
              <FlexItem flex={5}>
                <Flex justify="center">
                  <Flex
                      align="center"
                      orientation="column"
                  >
                    <Title
                        dark
                        paddingBottom="xs"
                        size={4}
                        text="Windows, Sidings, & Gutters"
                    />

                    <Caption dark>{'Dyamic Count goes here.'}</Caption>
                  </Flex>
                </Flex>
              </FlexItem>
              <FlexItem flex={1}>
                <Flex justify="end">
                  <Title
                      dark
                      size={4}
                      text="All Photos"
                  />
                </Flex>
              </FlexItem>
            </Lightbox.Header>
          </Lightbox>
        ) : (
          <div className="PhotoViewer">
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

export default LightboxCompoundComponent
