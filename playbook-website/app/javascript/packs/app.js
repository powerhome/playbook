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
import ComponentsList from '../components/ComponentsList'
import Component from '../components/ComponentsList/Component'

const rootElement = document.getElementById('react-root')

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
        element={<App />}
        path="/beta"
    >
      <Route
          element={<ComponentsList />}
          path="kits"
      >
        <Route
            element={<Component />}
            path=":name"
        />
        <Route
            element={<Navigate to="react" />}
            path=":name"
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
