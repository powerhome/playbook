/* @flow */
/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import React, { useState, useEffect } from 'react'
import { Flex, Image } from '../../'
import Lightbox from '../_lightbox.tsx'

const LightboxMultiple = (props) => {
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
  const [current, setCurrent] = useState()

  useEffect(()=> {
console.log("current from state", current)
  },[current])
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

const handleCurrent = (i) => {
  console.log(`current photo index: ${i}`)
  //so the currentphoto is already being exposed in the onChange, that's what the arg is
  // What we need is a way to change it. So here I'm just setting the current photo to a state
  // so we can access it
  setCurrent(i)
}

const handleSettingCurrent = (x) => {
  //This is just testing obviously, this is broken code since it will always set it to 8
  //no matter what is clicked, but wanted to test if exposing the setActivePhoto function
  //would let the dev actually change the photo. It does work, but not sure how to leverage this correctly?
  //Also, entirely not sure this is what we want to do it if I'm even passing the setActivePhoto correctly
  x(8)
}

  return (
    <div>
      {light ? (
        <Lightbox
            currentPhoto={(x) => handleSettingCurrent(x)}
            icon="times"
            initialPhoto={selectedPhoto}
            onChange={(i) => handleCurrent(i)}
            onClose={handleCloseLightbox}
            photos={photos}
            {...props}
        />
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
                    onClick={(index) => onPhotoClick(index)}
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

export default LightboxMultiple
