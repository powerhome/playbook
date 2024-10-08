import React, { useState } from "react"
import { Avatar, Button, Pill, Badge, Card, Title } from 'playbook-ui';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const kitResponse = ({response}) => {
const [editorDisabled, setEditorDisabled] = useState(true);

const handleEditorEditable = () => { 
  setEditorDisabled(!editorDisabled);
}
  const previewCode = response

  return (
    <>
      <LiveProvider code={previewCode} disabled={editorDisabled} scope={{ Avatar, Button, Pill, Badge, Title, Card }}>
      <Button  text={editorDisabled ? `Edit` : "Disable"} onClick={handleEditorEditable}/>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </>
  );
};

export default kitResponse;