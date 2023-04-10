/* @flow */
/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import React, { useState } from 'react'
import { Flex, Image, Button } from '../../'
import Lightbox from '../_lightbox.tsx'

const LightboxCurrentPhoto = (props) => {
  const photos = [
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
    'https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80',
    'https://images.unsplash.com/photo-1526657782461-9fe13402a841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1984&q=80',
    'https://images.unsplash.com/photo-1523057530100-383d7fbc77a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80',
  ]
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [light, toggleLight] = useState(false)
  //Setting state with the index of the current slide exposed by the onChange prop
  const [active, setActive] = useState(selectedPhoto)
  //Setting state for the current photo to pass to the kit
  const [currentPhoto, setCurrentPhoto] = useState(active)

  const handleCloseLightbox = () => {
    toggleLight(!light)
    setSelectedPhoto(null)
  }

  const onPhotoClick = (photo) => {
    toggleLight(!light)
    setSelectedPhoto(photo)
  }

  const exampleStyles = {
    width: "100%",
    overflow: "auto"
  }

  return (
    <div>
      {light ? (
        <>
          <div style={{width: '200px', height: '50px', position: 'fixed', top: 0, right: 0, zIndex: 1000000000000000}}>
            <div style={{position: 'absolute',right: '100px'}}>
              <Button 
                  onClick={()=> setCurrentPhoto(active > 0 ? active - 1 : 0)}
              >
                Back
              </Button>
            </div>
            <div style={{position: 'absolute', right: 0}}>
              <Button
                  onClick={() => setCurrentPhoto(active < photos.length - 1 ? active + 1 : photos.length - 1)}
              >
                Next
              </Button>
            </div>
          </div>
          <Lightbox
              currentPhoto={currentPhoto}
              icon="times"
              initialPhoto={selectedPhoto}
              onChange={(index) => setActive(index)}
              onClose={handleCloseLightbox}
              photos={photos}
              {...props}
          />
        </>
      ) : (
        <div
            className="PhotoViewer"
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
  )
}

export default LightboxCurrentPhoto
