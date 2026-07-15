
import React, { useState } from 'react'

import Body from '../../pb_body/_body'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import FileUpload from '../../pb_file_upload/_file_upload'
import Flex from '../../pb_flex/_flex'
import List from '../../pb_list/_list'
import ListItem from '../../pb_list/_list_item'

const FileUploadRemoveReplace = (props) => {
  const [filesToUpload, setFilesToUpload] = useState([])

  const handleOnFilesAccepted = (files) => {
    setFilesToUpload([...filesToUpload, ...files])
  }

  const handleRemoveFile = (index) => {
    setFilesToUpload(filesToUpload.filter((_, fileIndex) => fileIndex !== index))
  }

  return (
    <div>
      {filesToUpload.length > 0 && (
        <List marginBottom="sm">
          {filesToUpload.map((file, index) => (
            <ListItem key={`${file.name}-${index}`}>
              <Flex
                  align="center"
                  justify="between"
                  width="100%"
              >
                <Body text={file.name} />
                <CircleIconButton
                    aria={{ label: `Remove ${file.name}` }}
                    icon="times"
                    onClick={() => handleRemoveFile(index)}
                    variant="secondary"
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      )}
      <FileUpload
          onFilesAccepted={handleOnFilesAccepted}
          {...props}
      />
    </div>
  )
}

export default FileUploadRemoveReplace
