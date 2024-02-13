const entryPoint = `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.scss";
import "playbook-ui/dist/playbook.css";




const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
`

export default entryPoint
