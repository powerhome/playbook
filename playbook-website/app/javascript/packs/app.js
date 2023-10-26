import ReactDOM from 'react-dom'
import React from 'react'
import App from '../components/App'
import '@fortawesome/fontawesome-pro/js/fontawesome.min.js'
import '@fortawesome/fontawesome-pro/js/regular.min.js'
import '../site_styles/main.scss'
import 'playbook-ui/dist/playbook.css'
import 'playbook-ui/dist/playbook.js'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Scaffold from '../components/Scaffold'
import RedirectToType from '../components/RedirectToType'

const rootElement = document.getElementById('root')

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
        element={<App />}
        path="/beta"
    >
      <Route
          element={<Scaffold />}
          exact
          path="kits"
      >
        <Route
            element={<Scaffold />}
            exact
            path=":name/:type"
        />
        <Route
            element={<Navigate to="react" />}
            exact
            path=":name"
        />
        <Route
            element={<Navigate to="react" />}
            exact
            path=""
        />
      </Route>
      <Route
          element={<Scaffold />}
          path="kit_category/:name/:type"
      />
      <Route
          element={<RedirectToType />}
          path="kit_category/:name"
      />
    </Route>
  )
)

ReactDOM.render(
  <RouterProvider router={router} />,
  rootElement
)
