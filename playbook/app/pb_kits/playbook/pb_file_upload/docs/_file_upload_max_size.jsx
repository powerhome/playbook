/* @flow */
/* eslint-disable react/no-multi-comp */

import React, { useState } from 'react'
import {
  Body,
  FileUpload,
  List,
  ListItem,
} from '../..'

const AcceptedFilesList = ({ files }: FileList) => (
  <List>
    {files.map((file) => (
      <ListItem key={file.name}>{file.name}</ListItem>
    ))}
  </List>
)
const RejectedFilesList = ({ files }: FileList) => (
  <List>
    {files.map((file) => (
      <ListItem key={file.name}><Body color="error">{`${file.name} (file too large)`}</Body></ListItem>
    ))}
  </List>
)

const FileUploadMaxSize = (props) => {
  const [filesToUpload, setFilesToUpload] = useState([])
  const [filesRejected, setFilesRejected] = useState([])
  const [error, setError] = useState()

  const handleOnFilesAccepted = (files) => {
    if (files.length) setError()
    setFilesToUpload([...filesToUpload, ...files])
  }

  const handleOnFilesRejected = (error, files) => {
    setError(error)
    setFilesRejected([...filesRejected, ...files])
  }

  return (
    <div>
      <AcceptedFilesList
          files={filesToUpload}
          {...props}
      />
      <RejectedFilesList
          files={filesRejected}
          {...props}
      />
      <FileUpload
          acceptedFilesDescription="Choose a file or drag it here. 1 MB size limit."
          maxSize={1000000}
          onFilesAccepted={handleOnFilesAccepted}
          onFilesRejected={handleOnFilesRejected}
          {...props}
      />
      { error && (
        <Body
            color="error"
            marginY="md"
        >
          {error}
        </Body>
      )}
    </div>
  )
}

export default FileUploadMaxSize
