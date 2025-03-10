
import React, { useState } from 'react'

import FileUpload from '../../pb_file_upload/_file_upload'
import List from '../../pb_list/_list'
import ListItem from '../../pb_list/_list_item'

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
          accept={{
            "image/svg+xml": [".svg", ".xml"],
          }}
          onFilesAccepted={handleOnFilesAccepted}
          {...props}
      />
    </div>
  )
}

export default FileUploadAccept
