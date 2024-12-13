import React, { useEffect, useCallback, useRef } from 'react'
import { useDropzone, DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'
import classnames from 'classnames'

import { buildCss, buildDataProps, noop, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import type { Callback } from '../types'

import Body from '../pb_body/_body'
import Card from '../pb_card/_card'

type FileUploadProps = {
  accept?: string[],
  className?: string,
  customMessage?: string,
  dark?: boolean,
  data?: {[key: string]: string | number},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  acceptedFilesDescription?: string,
  maxSize?: number,
  onFilesAccepted: Callback<File, File>,
  onFilesRejected: (error: string, files: File[]) => void,
}

const getFormattedFileSize = (fileSize: number): string => {
  return `${fileSize / 1e+6} MB`
}

const FileUpload = (props: FileUploadProps): React.ReactElement => {
  const {
    accept = null,
    acceptedFilesDescription = '',
    className,
    customMessage,
    dark = false,
    data = {},
    htmlOptions = {},
    maxSize,
    onFilesAccepted = noop,
    onFilesRejected = noop,
  } = props

  const onDrop = useCallback((files) => {
    onFilesAccepted(files)
  }, [onFilesAccepted])

  type DropZoneProps = {
    getRootProps: () => DropzoneRootProps & any;
    getInputProps: () => DropzoneInputProps & any;
    isDragActive: boolean;
    rejectedFiles: File[];
  }

  const { getRootProps, getInputProps, isDragActive, rejectedFiles }: DropZoneProps = useDropzone({
    accept,
    maxSize,
    onDrop,
  })

  const prevRejected = useRef<File[] | null>(null);

  const maxFileSizeText = `Max file size is ${getFormattedFileSize(maxSize)}.`

  useEffect(() => {
    if (rejectedFiles === prevRejected.current) return
    const isFileTooLarge = maxSize && rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
    if (isFileTooLarge) {
      onFilesRejected(`File size is too large! ${maxFileSizeText}`, rejectedFiles)
    }
    prevRejected.current = rejectedFiles
  }, [maxFileSizeText, maxSize, onFilesRejected, rejectedFiles])

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
   const htmlProps = buildHtmlProps(htmlOptions)

  const getDescription = () => {
    return customMessage
      ? customMessage
      : `Choose a file or drag it here.${accept === null ? '' : ` The accepted file types are: ${acceptedFilesDescription || acceptedFileTypes()}.`}${maxSize ? ` ${maxFileSizeText}` : ''}`;
  }

  return (
    <div
        className={classnames(buildCss('pb_file_upload_kit'), globalProps(props), className)}
        {...dataProps}
        {...htmlProps}
        {...getRootProps()}
    >
      <Card dark={dark}>
        <input {...getInputProps()} />
        <Body
            color="light"
            dark={dark}
        >
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
