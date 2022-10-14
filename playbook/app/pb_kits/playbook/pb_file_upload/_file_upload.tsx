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
  data?: {[key: string]: string | number},
  acceptedFilesDescription?: string,
  maxSize?: number,
  onFilesAccepted: Callback<File, File>,
  onFilesRejected: Callback<string, string>,
}

const getFormattedFileSize = (fileSize: number): string => {
  return `${fileSize / 1e+6} MB`
}

const FileUpload = (props: FileUploadProps): React.ReactElement => {
  const {
    accept = null,
    acceptedFilesDescription = '',
    className,
    data = {},
    maxSize,
    onFilesAccepted = noop,
    onFilesRejected = noop,
  } = props

  const onDrop = useCallback((files) => {
    onFilesAccepted(files)
  }, [onFilesAccepted])
  const { getRootProps, getInputProps, isDragActive, rejectedFiles } = useDropzone({
    accept,
    maxSize,
    onDrop,
  })

  const getMaxFileSizeText = () => `Max file size is ${getFormattedFileSize(maxSize)}.`

  const isFileTooLarge = maxSize && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
  if (isFileTooLarge) onFilesRejected(`File size is too large! ${getMaxFileSizeText()}`)

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

  const getDescription = () => {
    let msg = ""
    accept === null ? msg += 'Choose a file or drag it here.' : msg += `Choose a file or drag it here. The accepted file types are: ${acceptedFilesDescription || acceptedFileTypes()}.`
    if (maxSize) msg += ` ${getMaxFileSizeText()}`
    return msg
  }

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
            <p>{getDescription()}</p>
          }
        </Body>
      </Card>
    </div>
  )
}

export default FileUpload
