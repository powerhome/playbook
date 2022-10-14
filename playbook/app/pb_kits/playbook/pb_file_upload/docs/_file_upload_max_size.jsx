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

const FileUploadMaxSize = (props) => {
  const [filesToUpload, setFilesToUpload] = useState([])
  const [error, setError] = useState()

  const handleOnFilesAccepted = (files) => {
    setFilesToUpload([...filesToUpload, ...files])
  }

  return (
    <div>
      <AcceptedFilesList
          files={filesToUpload}
          {...props}
      />
      <FileUpload
          acceptedFilesDescription="Choose a file or drag it here. 1 MB size limit."
          maxSize={1000000}
          onFilesAccepted={handleOnFilesAccepted}
          onFilesRejected={(errorMessage) => setError(errorMessage)}
          {...props}
      />
      { error && (
        <Body
            color="error"
            marginY="md"
        >{error}</Body>
      )}
    </div>
  )
}

export default FileUploadMaxSize
