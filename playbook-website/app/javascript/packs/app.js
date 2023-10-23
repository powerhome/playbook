import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import React from 'react'
import App from '../components/App'
import '@fortawesome/fontawesome-pro/js/fontawesome.min.js'
import '@fortawesome/fontawesome-pro/js/regular.min.js'
import '../site_styles/main.scss'
import 'playbook-ui/dist/playbook.css'
import 'playbook-ui/dist/playbook.js'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
)
