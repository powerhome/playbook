import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
    useLoaderData,
  useParams,
} from 'react-router-dom'

import App from './Website'
import Home from './Website/src/pages/Home'
import ComponentList from './Website/src/pages/ComponentList'
import CategoryShow from './Website/src/pages/CategoryShow'
import KitShow from './Website/src/pages/KitShow'
import Changelog from './Website/src/pages/Changelog'
import GettingStarted from './Website/src/pages/GettingStarted'
import DesignGuidelines from './Website/src/pages/DesignGuidelines'
import GuidePage from './Website/src/pages/GuidePage'
import Color from './Website/src/pages/DesignGuidelines/Color'
import Spacing from './Website/src/pages/DesignGuidelines/Spacing'
import Typography from './Website/src/pages/DesignGuidelines/Typography'
import Error from './Error'
import { CategoryLoader, ComponentsLoader, ComponentShowLoader, GuidesLoader, GuidePageLoader, IconsLoader } from './Website/src/hooks/loaders'
import GlobalPropsIndex from './GlobalPropsAndTokens/GlobalPropsIndex'
import GlobalPropsExamples from './GlobalPropsAndTokens/ExamplesPage/GlobalPropsExamplesIndex'
import TokensIndex from './GlobalPropsAndTokens/TokensIndex'
import TokensExamples from './GlobalPropsAndTokens/ExamplesPage/TokensExamplesIndex'
import IconsIndex from './Icons/IconsIndex'

function GlobalPropsShowPage() {
  const { name } = useParams()
  return <GlobalPropsExamples routeParamName={name} />
}

function TokensShowPage() {
  const { name } = useParams()
  return <TokensExamples routeParamName={name} />
}

function IconsPage() {
    const {
        icon_banner_image_url,
        icon_categories,
        icon_kit_url,
        icons_by_category,
    }: any = useLoaderData()

    return (
        <IconsIndex
            bannerImageUrl={icon_banner_image_url}
            iconCategories={icon_categories}
            iconKitUrl={icon_kit_url}
            iconsByCategory={icons_by_category}
        />
    )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
        element={<App />}
        errorElement={<Error />}
        id="site"
        loader={ComponentsLoader}
        path="/"
    >
      <Route element={<Home />} index />
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
      <Route path="kits" element={<ComponentList />}>
        <Route
            element={<Navigate to="react" />}
            loader={ComponentShowLoader}
            path=":name"
        />
      </Route>
      <Route
          element={<CategoryShow />}
          loader={CategoryLoader}
          path="kit_category/:category"
      />
      <Route
          element={<GlobalPropsIndex />}
          loader={ComponentsLoader}
          path="global_props"
      />
      <Route
          element={<GlobalPropsShowPage />}
          loader={ComponentsLoader}
          path="global_props/:name"
      />
      <Route
          element={<TokensIndex />}
          loader={ComponentsLoader}
          path="tokens"
      />
      <Route
          element={<TokensShowPage />}
          loader={ComponentsLoader}
          path="tokens/:name"
      />
      <Route
          element={<IconsPage />}
          loader={IconsLoader}
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
