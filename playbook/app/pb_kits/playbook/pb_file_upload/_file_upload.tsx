import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import classnames from 'classnames'

import { buildCss, buildDataProps, noop } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import type { Callback } from '../types'

import Body from '../pb_body/_body'
import Card from '../pb_card/_card'

type FileUploadProps = {
  accept?: string[],
  className?: string,
  data?: object,
  acceptedFilesDescription?: string,
  onFilesAccepted: Callback<File, File>,
}

const FileUpload = (props: FileUploadProps) => {
  const {
    accept = null,
    acceptedFilesDescription = '',
    className,
    data = {},
    onFilesAccepted = noop,
  } = props

  const onDrop = useCallback((files) => onFilesAccepted(files), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  })

  const acceptedFileTypes = () => {
    return accept.map((fileType) => {
      if (fileType.startsWith('image/')) {
        return fileType.replace('image/', ' ')
      } else {
        return fileType
      }
    })
  }

  const dataProps = buildDataProps(data)

  return (
    <div
        className={classnames(buildCss('pb_file_upload_kit'), globalProps(props), className)}
        {...dataProps}
        {...getRootProps()}
    >
      <Card>
        <input {...getInputProps()} />
        <Body color="light">
          {isDragActive ?
            <p>{'Drop the files here ...'}</p>
            :
            <p>{accept === null ? 'Choose a file or drag it here' : `Choose a file or drag it here. The accepted file types are: ${acceptedFilesDescription || acceptedFileTypes()}`}</p>
          }
        </Body>
      </Card>
    </div>
  )
}

export default FileUpload
