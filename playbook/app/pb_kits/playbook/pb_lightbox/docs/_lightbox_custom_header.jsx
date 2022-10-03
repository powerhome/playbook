/* @flow */
/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import React, { useState } from "react";
import { Flex, Image, Title, Pill } from "../../";
import Lightbox from "../_lightbox.tsx";

const LightboxCustomHeader = (props) => {
  const photos = [
    "https://images.unsplash.com/photo-1638727228877-d2a79ab75e68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2668&q=80",
    "https://images.unsplash.com/photo-1501045337096-542a73dafa4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2052&q=80",
    "https://images.unsplash.com/photo-1563693998336-93c10e5d8f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80,",
  ];
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [showLightbox, toggleShowLightbox] = useState(false);

  const handleCloseLightbox = () => {
    toggleShowLightbox(!showLightbox);
    setSelectedPhoto(null);
  };

  const onPhotoClick = (photo) => {
    toggleShowLightbox(!showLightbox);
    setSelectedPhoto(photo);
  };

  const exampleStyles = {
    width: "100%",
    overflow: "auto",
  };

  const customTitle = (
    <Title dark 
        paddingBottom="xxs"
    >
    My Custom Title
    </Title>
  );

  const customDescription = (
    <>
      <Title dark 
          size={4} 
          text="Tags" 
      />
      <Pill text="3" 
          variant="success" 
      />
    </>
  );

  return (
    <>
      <div>
      {showLightbox ? (
          <Lightbox
              description={customDescription}
              initialPhoto={selectedPhoto}
              navRight="All Photos"
              onClickRight={()=> alert("Clicked!")}
              onClose={handleCloseLightbox}
              photos={photos}
              title={customTitle}
              {...props}
          />
        ) : (
          <div className="PhotoViewer" 
              style={exampleStyles}
          >
            <Flex>
              {photos.map((photo, index) => {
                return (
                  <div key={photo[index]} 
                      onClick={() => onPhotoClick(index)}
                  >
                    <Image marginRight="xl" 
                        rounded 
                        size="lg" 
                        url={photo} 
                    />

                    <div className="overlay" />
                  </div>
                );
              })}
            </Flex>
          </div>
        )
      }
      </div>
    </>
  );
};

export default LightboxCustomHeader;
