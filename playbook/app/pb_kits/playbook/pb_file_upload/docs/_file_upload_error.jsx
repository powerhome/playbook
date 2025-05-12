import React, { useState } from 'react'
import FileUpload from '../_file_upload'
import List from '../../pb_list/_list'
import ListItem from '../../pb_list/_list_item'
import Icon from '../../pb_icon/_icon'

const AcceptedFilesList = ({ files }) => (
  <List>
    {files.map((file) => (
      <ListItem key={file.name}>{file.name}</ListItem>
    ))}
  </List>
)

const FileUploadError = (props) => {
  const [filesToUpload, setFilesToUpload] = useState([])

  const handleOnFilesAccepted = (files) => {
    setFilesToUpload([...filesToUpload, ...files])
  }

  const error = (<>
    <Icon icon="warning" /> Please make a valid selection
  </>)

  return (
    <div>
      <AcceptedFilesList
          files={filesToUpload}
          {...props}
      />
      <FileUpload
          error={error}
          onFilesAccepted={handleOnFilesAccepted}
          {...props}
      />
    </div>
  )
}

export default FileUploadError
