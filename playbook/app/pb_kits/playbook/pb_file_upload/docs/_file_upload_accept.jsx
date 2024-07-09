/* @flow */

import React, { useState } from 'react'
import {
  FileUpload,
  List,
  ListItem,
} from 'playbook-ui'

const AcceptedFilesList = ({ files }) => (
  <List>
    {files.map((file) => (
      <ListItem key={file.name}>{file.name}</ListItem>
    ))}
  </List>
)

const FileUploadAccept = (props) => {
  const [filesToUpload, setFilesToUpload] = useState([])

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
          accept={['image/svg+xml']}
          onFilesAccepted={handleOnFilesAccepted}
          {...props}
      />
    </div>
  )
}

export default FileUploadAccept
