/* @flow */

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import {
  buildCss,
  noop,
} from '../utilities/props'

import type { Callback } from '../types.js'

import {
  Body,
  Card,
} from '..'

type FileUploadProps = {
  accept?: Array<String>,
  className?: String,
  onFilesAccepted: Callback,
}

const FileUpload = ({
  accept = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'],
  className,
  onFilesAccepted = noop,
}: FileUploadProps) => {
  const onDrop = useCallback((files) => {
    onFilesAccepted(files)
  })

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept,
    onDrop,
  })

  return (
    <div
        className={buildCss('pb_file_upload_kit', className)}
        {...getRootProps()}
    >
      <Card>
        <input {...getInputProps()} />
        <Body
            color="light"
        >
          <If condition={isDragActive}>
            <p>{'Drop the files here ...'}</p>
            <Else />
            <p>{'Drag & drop some files here, or click to select files'}</p>
          </If>
        </Body>
      </Card>
    </div>
  )
}

export default FileUpload
