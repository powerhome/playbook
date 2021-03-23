

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

const FileUploadDefault = (props) => {
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
          onFilesAccepted={handleOnFilesAccepted}
          {...props}
      />
    </div>
  )
}

export default FileUploadDefault
