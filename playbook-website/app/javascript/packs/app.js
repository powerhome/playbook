import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'

import App from '../components/Website'
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
