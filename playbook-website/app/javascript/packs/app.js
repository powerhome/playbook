import ReactDOM from 'react-dom'
import React from 'react'
import App from '../components/Website'
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
import ComponentsList from '../components/Website/src/pages/ComponentList'
import Component from '../components/Website/src/pages/ComponentShow'
import { ComponentsLoader } from '../components/Website/src/hooks/loaders'

const rootElement = document.getElementById('react-root')

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
        element={<App />}
        loader={ComponentsLoader}
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
    </Route>
  )
)
ReactDOM.render(
  <RouterProvider router={router} />,
  rootElement
)
