import React from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import '@codesandbox/sandpack-react/dist/index.css'

/* eslint react/prop-types: 0 */

const code = `import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "playbook-ui/dist/reset.css";
import "playbook-ui/dist/playbook.css";
import "playbook-ui/dist/fonts/fontawesome-min";
import "playbook-ui/dist/fonts/regular-min";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
`

const CodeEditor = ({ source }) => {
  return (
    <Sandpack
        customSetup={{
        dependencies: {
          'playbook-ui': 'latest',
        },

        entry: 'index.js',

        files: {
          '/App.js': `${source}`,
          '/index.js': `${code}`,
        },
      }}
        options={{
        externalResources: [
          'https://unpkg.com/@playbook-ui/dist/reset.css.css',
          'https://unpkg.com/@laybook-ui/dist/playbook.css',
        ],
      }}
        template="react"
        theme="monokai-pro"
    />
  )
}

export default CodeEditor
