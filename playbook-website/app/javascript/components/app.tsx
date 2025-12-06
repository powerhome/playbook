import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'

import App from './Website'
import ComponentList from './Website/src/pages/ComponentList'
import CategoryShow from './Website/src/pages/CategoryShow'
import KitShow from './Website/src/pages/KitShow'
import IconList from './Website/src/pages/IconList'
import Changelog from './Website/src/pages/Changelog'
import GettingStarted from './Website/src/pages/GettingStarted'
import DesignGuidelines from './Website/src/pages/DesignGuidelines'
import GuidePage from './Website/src/pages/GuidePage'
import Color from './Website/src/pages/DesignGuidelines/Color'
import Spacing from './Website/src/pages/DesignGuidelines/Spacing'
import Typography from './Website/src/pages/DesignGuidelines/Typography'
import Error from './Error'
import { CategoryLoader, ComponentsLoader, ComponentShowLoader, GuidePageLoader } from './Website/src/hooks/loaders'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
        element={<App />}
        loader={ComponentsLoader}
        path="/beta"
        errorElement={<Error />}
    >
      <Route
          element={<ComponentList />}
          loader={ComponentsLoader}
          path="kits"
      >
        <Route
            element={<Navigate to="react" />}
            loader={ComponentShowLoader}
            path=":name"
        />
      </Route>
      <Route
          element={<KitShow />}
          loader={ComponentShowLoader}
          path="kits/advanced_table/:name/:platform"
      />
      <Route
          element={<KitShow />}
          loader={ComponentShowLoader}
          path="kits/:name/:platform"
      />
      <Route
          element={<CategoryShow />}
          loader={CategoryLoader}
          path="kit_category/:category"
      />
      <Route
          element={<IconList />}
          path="icons"
      />
      <Route
          element={<Changelog />}
          loader={ComponentsLoader}
          path="changelog"
      />
       <Route
          element={<Changelog />}
          loader={ComponentsLoader}
          path="changelog/:variant"
      />
      <Route
          element={<GettingStarted />}
          loader={ComponentsLoader}
          path="guides/getting_started"
      />
      <Route
          element={<GuidePage />}
          loader={GuidePageLoader}
          path="guides/getting_started/:page"
      />
      <Route
          element={<DesignGuidelines />}
          loader={ComponentsLoader}
          path="guides/design_guidelines"
      />
      <Route
          element={<Color />}
          loader={ComponentsLoader}
          path="guides/design_guidelines/color"
      />
      <Route
          element={<Spacing />}
          loader={ComponentsLoader}
          path="guides/design_guidelines/spacing"
      />
      <Route
          element={<Typography />}
          loader={ComponentsLoader}
          path="guides/design_guidelines/typography"
      />
      <Route
          element={<GuidePage />}
          loader={GuidePageLoader}
          path="guides/design_guidelines/:page"
      />

    </Route>
  )
)

export const Website = () => <RouterProvider router={router} />
