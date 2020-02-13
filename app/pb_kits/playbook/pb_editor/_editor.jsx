// /* @flow */

// import React, { useState } from 'react'
// import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
// import { Card } from '../'
// import { Icon } from '../'

// const scope = { Card }

// const code = `
//     <div>
//       <Card shadow="none">{'Card content'}</Card>
//       <br />
//       <Card shadow="shallow">{'Card content'}</Card>
//       <br />
//       <Card shadow="default">{'Card content'}</Card>
//       <br />
//       <Card shadow="deep">{'Card content'}</Card>
//       <br />
//       <Card shadow="deeper">{'Card content'}</Card>
//       <br />
//       <Card shadow="deepest">{'Card content'}</Card>
//       <br />
//     </div>
// `

// const Editor = () => {
//   const [editorShow, setEditorShow] = useState(false)
//   const toggleEditor = () => {
//     setEditorShow(!editorShow)
//   }

//   return (
//     <LiveProvider
//         code={code}
//         scope={scope}
//     >
//       <a onClick={toggleEditor}>
//         <Icon icon="code" />
//       </a>

//       {editorShow && (
//         <div className="cool">
//           <LiveEditor />
//         </div>
//       )}

//       <div className="cool2">
//         <LivePreview />
//       </div>

//       <LiveError />
//     </LiveProvider>
//   )
// }

// export default Editor
