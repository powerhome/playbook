import React, { useState } from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react"

import AnimateHeight from 'react-animate-height'
import { Button, Caption } from "playbook-ui"
import entryPoint from "./entryPoint"
//import FontScss from "./fonts/_site-fonts.scss"

const KitDocs = ({ source, exampleTitle }) => {
  const [editorHeight, setEditorHeight] = useState(0)

  const code = source
    .replace(
      /import (\w+) from ('|")\.\.\/_(\w+)('|")/g,
      'import { $1 } from "playbook-ui"'
    )
    .replace(
      /import \{ (.*) \} from ('|")\.\.\/(.*)('|")/g,
      'import { $1 } from "playbook-ui"'
    )

  return (
    <>
      <SandpackProvider
        files={{
          "/style.css": {
            code: `
            body {background-color: white !important;}
            @font-face {
              src: url('https://drive.google.com/file/d/1ON2kNB_grPioV5fCLEoDryzXNHJnRn7y/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: normal;
                font-weight: 500;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1DdTtmTo0Thocy96QUfuWaR9_yIfpUKPb/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: normal;
                font-weight: 400;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/113MpGn-fFjSGlj62u4EjlkZC8PEo4m9q/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: normal;
                font-weight: 100;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/13M6YuH-rPONUychordDi3S2k_X5XE3N8/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: normal;
                font-weight: 600;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1eekKjElnSw2KVuAn3YRRszM3ZRUaO0Z5/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: normal;
                font-weight: 700;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1QBuRuy-fZTMlDO3I7ITu4r280PL131Jk/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: normal;
                font-weight: 800;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1gEBOx6C-PgKFnhqF2GCpPeSWysthDwk4/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: normal;
                font-weight: 900;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1rUuYR80CC0JRe4y3to54-vK-LE3l9g3R/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: italic;
                font-weight: 500;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1BjzhRfnZeHJp5V3R1qZcpFkv6wro19IT/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: italic;
                font-weight: 400;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1c0z4IwJq316HiVELuie_iSeBE5Ig7Por/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: italic;
                font-weight: 100;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1uuxP7iK1d62kaTl8X_sJwt70gelyvcAx/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: italic;
                font-weight: 600;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1-2pbBv57UAJIhThRZOYW-5_WWatXoDeA/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: italic;
                font-weight: 700;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1RWcLIHSpKKeuTSmNiRcOmVnHixyZLh2d/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: italic;
                font-weight: 800;
                
            }
            @font-face {
              src: url('https://drive.google.com/file/d/1piRtihLOkXOlzn_mW2I-DGhh_eBxgQ1S/view?usp=share_link') format('woff2');
                font-family: 'Proxima Nova';
                font-style: italic;
                font-weight: 900;
                
            }
            `,
            hidden: true,
          },
          "/App.js": {
            code: code,
          },
          "/index.js": {
            code: entryPoint,
            hidden: true,
          },
          // "/fonts.scss": {
          //   code: FontScss,
          // },
        }}
        theme='dark'
        template='react'
        customSetup={{
          entry: "/src/index.js",
          dependencies: {
            "playbook-ui": "latest",
          },
        }}
        options={{
          externalResources: [
            "https://kit.fontawesome.com/098a1cd4d5.js",
            //"https://unpkg.com/playbook-ui@latest/dist/playbook.css",
            //"https://unpkg.com/playbook-ui@latest/dist/reset.css",
          ],
        }}
      >
        <SandpackLayout style={{ backgroundColor: "white", border: "none" }}>
          <div style={{ width: "100%" }}>
            <div className='pb--kit-example'>
              <Caption paddingBottom='md' text={exampleTitle}></Caption>

              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                style={{ backgroundColor: "white" }}
              />
            </div>

            {editorHeight === 0 && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Button
                  icon='code'
                  marginRight='xl'
                  onClick={() => setEditorHeight('auto')}
                  paddingX='none'
                  tabIndex={0}
                  text='Show Code'
                  variant='link'
                />
              </div>
            )}

            {editorHeight === 'auto' && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'right',
                }}
              >
                <Button
                  icon='times'
                  marginRight='xl'
                  onClick={() => setEditorHeight(0)}
                  paddingX='none'
                  tabIndex={0}
                  text='Close Code'
                  variant='link'
                />
              </div>
            )}

            <AnimateHeight duration={500} height={editorHeight}>
              <SandpackCodeEditor
                style={{ height: "100%", maxHeight: "300px" }}
              />
            </AnimateHeight>
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </>
  )
}

export default KitDocs
