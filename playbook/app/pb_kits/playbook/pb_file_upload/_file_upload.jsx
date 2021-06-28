/* @flow */

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import classnames from 'classnames'

import { buildCss, noop } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import type { Callback } from '../types'

import Body from '../pb_body/_body'
import Card from '../pb_card/_card'

type FileUploadProps = {
  accept?: array<string>,
  className?: string,
  onFilesAccepted: Callback,
}

const FileUpload = (props: FileUploadProps) => {
  const {
    accept = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg+xml'],
    className,
    onFilesAccepted = noop,
  } = props
  const onDrop = useCallback((files) => {
    onFilesAccepted(files)
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
  })

  return (
    <div
        className={classnames(buildCss('pb_file_upload_kit'), globalProps(props), className)}
        {...getRootProps()}
    >
      <Card>
        <input {...getInputProps()} />
        <Body color="light">
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
