import React from 'react'
import App from '../components/Website'
import '@fortawesome/fontawesome-pro/js/fontawesome.min.js'
import '@fortawesome/fontawesome-pro/js/regular.min.js'
import 'playbook-ui/dist/playbook.css'
import 'playbook-ui/dist/playbook.js'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import ComponentList from '../components/Website/src/pages/ComponentList'
import ComponentShow from '../components/Website/src/pages/ComponentShow'
import { ComponentsLoader } from '../components/Website/src/hooks/loaders'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
        element={<App />}
        loader={ComponentsLoader}
        path="/beta"
    >
      <Route
          element={<ComponentList />}
          path="kits"
      >
        <Route
            element={<ComponentShow />}
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

export const Website = () => <RouterProvider router={router} />
