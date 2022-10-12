import React from 'react'
import classnames from 'classnames'
import Image from '../../pb_image/_image'

type ThumbnailType = {
  active?: boolean,
  alt?: string,
  onClick: () => void,
  buttonRef?: React.RefObject<HTMLButtonElement>,
  url: string,
  width?: string,
}

export default function Thumbnail({
  active = false,
  alt,
  width,
  url,
  onClick = ()=>{},
  buttonRef,
}: ThumbnailType): React.ReactElement {
  const activeClasses = classnames('Thumbnail', { active })
  return (
    <button
        className={classnames(activeClasses)}
        onClick={onClick}
        ref={buttonRef}
        style={{ width }}
        type="button"
    >
      <Image
          alt={alt}
          size="sm"
          url={url}
      />
    </button>
  )
}
