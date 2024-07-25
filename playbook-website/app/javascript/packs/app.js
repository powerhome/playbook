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
import { CategoryLoader, ComponentsLoader, ComponentShowLoader, } from '../components/Website/src/hooks/loaders'

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
            loader={ComponentShowLoader}
            path=":name"
        />
        <Route
            element={<Navigate to="react" />}
            path=":name"
            loader={ComponentShowLoader}
        />
      </Route>
      <Route
          element={<CategoryShow />}
          loader={CategoryLoader}
          path="kit_category/:category"
      />
      <Route
          element={<IconList />}
          path="icons"
      />

    </Route>
  )
)

export const Website = () => <RouterProvider router={router} />
