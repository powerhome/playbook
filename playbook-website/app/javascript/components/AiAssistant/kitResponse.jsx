import React, { useState } from "react"
import { Avatar, Button, Pill, Badge, Card, Title, BarGraph } from 'playbook-ui';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const kitResponse = ({response}) => {
const [editorDisabled, setEditorDisabled] = useState(true);

const handleEditorEditable = () => { 
  setEditorDisabled(!editorDisabled);
}
// Use a regular expression to extract the content inside the return statement
const extractJSX = (code) => {
  const match = code.match(/return\s*\(([\s\S]*?)\n\s*\)/);
  return match ? match[1].trim() : null;
};

const jsxCode = extractJSX(response);

  return (
    <>
      <LiveProvider code={jsxCode} scope={{ Avatar, Button, Pill, Badge, Title, Card, BarGraph }}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </>
  );
};

export default kitResponse;