/* eslint-disable react/no-multi-comp */

import React, { useState } from "react";
import FileUpload from '../../pb_file_upload/_file_upload'
import List from '../../pb_list/_list'
import ListItem from '../../pb_list/_list_item'

const AcceptedFilesList = ({ files }) => (
  <List>
    {files.map((file) => (
      <ListItem key={file.name}>{file.name}</ListItem>
    ))}
  </List>
);

const FileUploadCustomDescription = (props) => {
  const [filesToUpload, setFilesToUpload] = useState([]);

  const handleOnFilesAccepted = (files) => {
    setFilesToUpload([...filesToUpload, ...files]);
  };

  return (
    <div>
      <AcceptedFilesList
          files={filesToUpload}
          {...props}
      />
      <FileUpload
          accept={{
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
          }}
          acceptedFilesDescription="Adobe (.pdf) and Microsoft (.xslx)"
          onFilesAccepted={handleOnFilesAccepted}
          {...props}
      />
    </div>
  );
};

export default FileUploadCustomDescription;
