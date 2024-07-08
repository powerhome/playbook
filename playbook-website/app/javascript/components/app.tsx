import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'

import App from './Website'
import ComponentList from './Website/src/pages/ComponentList'
import ComponentShow from './Website/src/pages/ComponentShow'
import CategoryShow from './Website/src/pages/CategoryShow'
import IconList from './Website/src/pages/IconList'
import { CategoryLoader, ComponentsLoader, ComponentShowLoader, } from './Website/src/hooks/loaders'

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
            loader={ComponentShowLoader}
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
          path="icons"
      />

    </Route>
  )
)

export const Website = () => <RouterProvider router={router} />
