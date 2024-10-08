import React, { useState } from "react"
import { Avatar, Button, Pill } from 'playbook-ui';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const kitResponse = (props) => {
const [editorDisabled, setEditorDisabled] = useState(true);

const handleEditorEditable = () => { 
  setEditorDisabled(!editorDisabled);
}

  const previewCode = `
  <>
    <Avatar
      name="Carlos Lima"
      size="lg"
    />
    <Pill 
      text="Hey" 
      variant="success"
    />
  </>
  `;

  return (
    <>
      <LiveProvider code={previewCode} disabled={editorDisabled} scope={{ Avatar, Pill }}>
      <Button  text={editorDisabled ? `Edit` : "Disable"} onClick={handleEditorEditable}/>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </>
  );
};

export default kitResponse;