import React, { useEffect } from 'react'
import Slides from './Slides'
import Thumbnails from './Thumbnails'

type CarouselType = {
  initialPhoto?: string,
  onClose?: () => void,
  icon?: string,
  currentIndex: number,
  photos: {
    url: string,
    thumbnail: string,
  }[],
  onChange: (index: number) => void,
  onClick?: (index: number) => void,
  setIndex?: (index: number)=> void,
}

export default function Carousel({
  currentIndex,
  photos,
  onClick,
  onChange = () => undefined,
  setIndex,
}: CarouselType): React.ReactElement {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'initial'
    }
  }, [])

  const handleChange = (index: number) => {
    onChange(index)
  }

  return (
    <div className="Lightbox">
      <Slides
          current={currentIndex}
          onChange={handleChange}
          onClick={onClick}
          setIndex={setIndex}
          urls={photos.map((photo) => photo.url)}
      />
      {photos.length > 1 ? (
        <Thumbnails
            current={currentIndex}
            onChange={handleChange}
            urls={photos.map((photo) => photo.thumbnail)}
        />
      ) : null}
    </div>
  )
}
