/* eslint-disable react/no-multi-comp */

import React from "react";
import FileUpload from "../../pb_file_upload/_file_upload";

const UploadFileRequiredIndicator = () => {
  return (
    <div>
      <FileUpload requiredIndicator />
    </div>
  );
};

export default UploadFileRequiredIndicator;
