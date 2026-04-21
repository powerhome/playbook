import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useParams,
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
import { CategoryLoader, ComponentsLoader, ComponentShowLoader, GuidesLoader, GuidePageLoader } from './Website/src/hooks/loaders'
import GlobalPropsIndex from './GlobalPropsAndTokens/GlobalPropsIndex'
import GlobalPropsExamples from './GlobalPropsAndTokens/ExamplesPage/GlobalPropsExamplesIndex'
import TokensIndex from './GlobalPropsAndTokens/TokensIndex'
import TokensExamples from './GlobalPropsAndTokens/ExamplesPage/TokensExamplesIndex'

function GlobalPropsShowPage() {
  const { name } = useParams()
  return <GlobalPropsExamples routeParamName={name} />
}

function TokensShowPage() {
  const { name } = useParams()
  return <TokensExamples routeParamName={name} />
}

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
          element={<GlobalPropsIndex linkPrefix="/beta" />}
          loader={ComponentsLoader}
          path="global_props"
      />
      <Route
          element={<GlobalPropsShowPage />}
          loader={ComponentsLoader}
          path="global_props/:name"
      />
      <Route
          element={<TokensIndex linkPrefix="/beta" />}
          loader={ComponentsLoader}
          path="tokens"
      />
      <Route
          element={<TokensShowPage />}
          loader={ComponentsLoader}
          path="tokens/:name"
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
          loader={GuidesLoader}
          path="guides/getting_started"
      />
      <Route
          element={<GuidePage />}
          loader={GuidePageLoader}
          path="guides/getting_started/:page"
      />
      <Route
          element={<DesignGuidelines />}
          loader={GuidesLoader}
          path="guides/design_guidelines"
      />
      <Route
          element={<Color />}
          loader={GuidesLoader}
          path="guides/design_guidelines/color"
      />
      <Route
          element={<Spacing />}
          loader={GuidesLoader}
          path="guides/design_guidelines/spacing"
      />
      <Route
          element={<Typography />}
          loader={GuidesLoader}
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
