import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useLoaderData,
  useParams,
} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LoadingInline } from 'playbook-ui'

import App from '../index'
import Error from './components/Error'
import {
  CategoryLoader,
  ComponentsLoader,
  ComponentShowLoader,
  GuidesLoader,
  GuidePageLoader,
  IconsLoader,
  PlaygroundLoader,
} from './hooks/loaders'

// Route pages are lazy-loaded (via each Route's `lazy` prop, or React.lazy below
// for the few pages rendered from an inline wrapper) so every page's code ships
// as its own chunk fetched on demand, instead of all pages — including the full
// Playground builder — bundling into one script every page has to download.
const GlobalPropsExamples = lazy(() => import('./components/GlobalPropsAndTokens/ExamplesPage/GlobalPropsExamplesIndex'))
const TokensExamples = lazy(() => import('./components/GlobalPropsAndTokens/ExamplesPage/TokensExamplesIndex'))
const IconsIndex = lazy(() => import('./components/Icons/IconsIndex'))

function GlobalPropsShowPage() {
  const { name } = useParams()
  return (
    <Suspense fallback={<LoadingInline />}>
      <GlobalPropsExamples routeParamName={name} />
    </Suspense>
  )
}

function TokensShowPage() {
  const { name } = useParams()
  return (
    <Suspense fallback={<LoadingInline />}>
      <TokensExamples routeParamName={name} />
    </Suspense>
  )
}

function IconsPage() {
  const {
    icon_banner_image_url,
    icon_categories,
    icon_kit_url,
    icons_by_category,
  }: any = useLoaderData()

  return (
    <Suspense fallback={<LoadingInline />}>
      <IconsIndex
        bannerImageUrl={icon_banner_image_url}
        iconCategories={icon_categories}
        iconKitUrl={icon_kit_url}
        iconsByCategory={icons_by_category}
      />
    </Suspense>
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
      <Route
        index
        lazy={() => import('./pages/Home').then((mod) => ({ Component: mod.default }))}
      />
      <Route
        lazy={() => import('./pages/KitShow').then((mod) => ({ Component: mod.default }))}
        loader={ComponentShowLoader}
        path="kits/advanced_table/:name/:platform"
      />
      <Route
        lazy={() => import('./pages/KitShow').then((mod) => ({ Component: mod.default }))}
        loader={ComponentShowLoader}
        path="kits/:name/:platform"
      />
      <Route
        lazy={() => import('./pages/ComponentList').then((mod) => ({ Component: mod.default }))}
        path="kits"
      >
        <Route
          element={<Navigate to="react" />}
          loader={ComponentShowLoader}
          path=":name"
        />
      </Route>
      <Route
        lazy={() => import('./pages/CategoryShow').then((mod) => ({ Component: mod.default }))}
        loader={CategoryLoader}
        path="kit_category/:category"
      />
      <Route
        lazy={() => import('./components/GlobalPropsAndTokens/GlobalPropsIndex').then((mod) => ({ Component: mod.default }))}
        loader={ComponentsLoader}
        path="global_props"
      />
      <Route
        element={<GlobalPropsShowPage />}
        loader={ComponentsLoader}
        path="global_props/:name"
      />
      <Route
        lazy={() => import('./components/GlobalPropsAndTokens/TokensIndex').then((mod) => ({ Component: mod.default }))}
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
        lazy={() => import('./pages/Playground').then((mod) => ({ Component: mod.default }))}
        loader={PlaygroundLoader}
        path="playground"
      />
      <Route
        lazy={() => import('./pages/WorldCup').then((mod) => ({ Component: mod.default }))}
        path="worldcup"
      />
      <Route
        lazy={() => import('./pages/Changelog').then((mod) => ({ Component: mod.default }))}
        loader={ComponentsLoader}
        path="changelog"
      />
      <Route
        lazy={() => import('./pages/Changelog').then((mod) => ({ Component: mod.default }))}
        loader={ComponentsLoader}
        path="changelog/:variant"
      />
      <Route
        lazy={() => import('./pages/GettingStarted').then((mod) => ({ Component: mod.default }))}
        loader={GuidesLoader}
        path="guides/getting_started"
      />
      <Route
        lazy={() => import('./pages/GuidePage').then((mod) => ({ Component: mod.default }))}
        loader={GuidePageLoader}
        path="guides/getting_started/:page"
      />
      <Route
        lazy={() => import('./pages/DesignGuidelines').then((mod) => ({ Component: mod.default }))}
        loader={GuidesLoader}
        path="guides/design_guidelines"
      />
      <Route
        lazy={() => import('./pages/DesignGuidelines/Color').then((mod) => ({ Component: mod.default }))}
        loader={GuidesLoader}
        path="guides/design_guidelines/color"
      />
      <Route
        lazy={() => import('./pages/DesignGuidelines/Spacing').then((mod) => ({ Component: mod.default }))}
        loader={GuidesLoader}
        path="guides/design_guidelines/spacing"
      />
      <Route
        lazy={() => import('./pages/DesignGuidelines/Typography').then((mod) => ({ Component: mod.default }))}
        loader={GuidesLoader}
        path="guides/design_guidelines/typography"
      />
      <Route
        lazy={() => import('./pages/GuidePage').then((mod) => ({ Component: mod.default }))}
        loader={GuidePageLoader}
        path="guides/design_guidelines/:page"
      />
    </Route>
  )
)

export const Website = () => <RouterProvider router={router} />
