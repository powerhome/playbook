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
import CategoryShow from '../components/Website/src/pages/CategoryShow'
import IconList from '../components/Website/src/pages/IconList'
import { CategoryLoader, ComponentsLoader } from '../components/Website/src/hooks/loaders'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
        element={<App />}
        loader={ComponentsLoader}
        path="/beta"
    >
      <Route
          element={<ComponentList />}
          loader={ComponentsLoader}
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
      <Route
          element={<CategoryShow />}
          loader={CategoryLoader}
          path="kit_category/:name"
      />
      <Route
          element={<IconList />}
          path=":name"
      />

    </Route>
  )
)

export const Website = () => <RouterProvider router={router} />
