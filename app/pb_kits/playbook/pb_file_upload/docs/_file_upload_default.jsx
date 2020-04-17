/* @flow */

import React, { useState } from 'react'
import {
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

const FileUploadDefault = () => {
  const [filesToUpload, setFilesToUpload] = useState([])

  const handleOnFilesAccepted = (files) => {
    setFilesToUpload([...filesToUpload, ...files])
  }

  return (
    <div>
      <AcceptedFilesList files={filesToUpload} />
      <FileUpload
          onFilesAccepted={handleOnFilesAccepted}
      />
    </div>
  )
}

export default FileUploadDefault
