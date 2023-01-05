import React, { useState } from 'react'
import { Title, CircleIconButton } from 'playbook-ui'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"
import TableSmCode from 'playbook-ui/app/pb_kits/playbook/pb_table/docs/_table_sm'

const KitDocs = ({ kit }) => {
  const [showCode, setShowCode] = useState(false);
  return (
    <>
      <Title
          size={1}
          tag="h1"
          text={kit}
      />

      <SandpackProvider
        theme="dark" //https://sandpack.codesandbox.io/docs/getting-started/themes
        template="react" //https://sandpack.codesandbox.io/docs/getting-started/custom-content#templates
        files={{
          "/App.js": TableSmCode, //https://sandpack.codesandbox.io/docs/getting-started/custom-content#custom-file-contents
        }}
        customSetup={{
          dependencies: { //https://sandpack.codesandbox.io/docs/getting-started/custom-content#npm-dependencies
            'playbook-ui': 'latest',
          },
        }}
        options={{ //https://sandpack.codesandbox.io/docs/getting-started/custom-ui#editor-settings
          externalResources: [ 
            /* https://sandpack.codesandbox.io/docs/getting-started/custom-content#static-external-resources
              We can use this config to get all the CSS we would need from Playbook
              'playbook-ui/dist/reset.css',
              'playbook-ui/dist/playbook.css',
              'playbook-ui/dist/fonts/fontawesome-min',
              'playbook-ui/dist/fonts/regular-min',
            */
          ],
        }}>
        <SandpackLayout>
          <div style={{ width:'100%' }}>
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton={false}
              actionsChildren={
                <CircleIconButton
                  icon="pen"
                  variant="secondary"
                  onClick={() => setShowCode(!showCode)}
                />
              } />
          </div>
          { showCode && <SandpackCodeEditor /> }
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}

export default KitDocs

