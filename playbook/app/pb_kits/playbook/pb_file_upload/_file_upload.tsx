import React, { useEffect, useCallback, useRef } from 'react'
import { useDropzone, DropzoneInputProps, DropzoneRootProps, FileRejection } from 'react-dropzone'
import classnames from 'classnames'

import { buildCss, buildDataProps, noop, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import type { Callback } from '../types'

import Body from '../pb_body/_body'
import Card from '../pb_card/_card'

import { isEmpty } from '../utilities/object'

type FileUploadProps = {
  accept?: Record<string, string[]>,
  className?: string,
  customMessage?: string,
  dark?: boolean,
  data?: {[key: string]: string | number},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  acceptedFilesDescription?: string,
  maxSize?: number,
  onFilesAccepted: Callback<File, File>,
  onFilesRejected: (error: string, files: readonly FileRejection[]) => void,
  error?: string,
}

const getFormattedFileSize = (fileSize: number): string => {
  return `${fileSize / 1e+6} MB`
}

const FileUpload = (props: FileUploadProps): React.ReactElement => {
  const {
    accept = {},
    acceptedFilesDescription = '',
    className,
    customMessage,
    dark = false,
    data = {},
    error,
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
    fileRejections: readonly FileRejection[];
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections }: DropZoneProps = useDropzone({
    accept,
    maxSize,
    onDrop,
  })

  const prevRejected = useRef<readonly FileRejection[] | null>(null);

  let maxFileSizeText = ''
  if (maxSize !== undefined) {
    maxFileSizeText = `Max file size is ${getFormattedFileSize(maxSize)}.`
  }

  useEffect(() => {
    if (fileRejections === prevRejected.current) return
    const isFileTooLarge = maxSize && fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
    if (isFileTooLarge) {
      onFilesRejected(`File size is too large! ${maxFileSizeText}`, fileRejections)
    }
    prevRejected.current = fileRejections
  }, [maxFileSizeText, maxSize, onFilesRejected, fileRejections])

  const acceptedFileTypes = () => {
    if (!accept) {
      return []
    }

    return Object.keys(accept).map((fileType) => {
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
      : `Choose a file or drag it here.${isEmpty(accept) ? '' : ` The accepted file types are: ${acceptedFilesDescription || acceptedFileTypes()}.`}${maxSize ? ` ${maxFileSizeText}` : ''}`;
  }

  return (
    <div
        className={classnames(buildCss('pb_file_upload_kit'), { 'error': error }, globalProps(props), className)}
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
      {error && (
        <Body
            dark={dark}
            marginTop="xxs"
            status="negative"
            text={error}
        />
      )}
    </div>
  )
}

export default FileUpload
