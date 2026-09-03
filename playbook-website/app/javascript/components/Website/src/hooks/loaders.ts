import { LoaderFunctionArgs } from "react-router-dom";
import { isProductionHost } from "../utils/siteNavigation";

interface ComponentTypes {
  name: string;
  platforms: string[];
  description: string;
}

interface CategoryTypes {
  category: string;
  description: string;
  components: ComponentTypes[];
}

const sortByName = (a: ComponentTypes, b: ComponentTypes): number => {
  return a.name.localeCompare(b.name);
}

const sortComponentsByName = (kitCategory: CategoryTypes) => {
  kitCategory.components.sort(sortByName);
};

// Module-level cache — fetched once per page session, reused on every navigation.
let kitsCache: any = null;

async function fetchKits() {
  if (kitsCache) return kitsCache;
  const response = await fetch("/kits.json");
  const data = await response.json();
  data.kits.forEach(sortComponentsByName);
  kitsCache = data;
  return data;
}

export const ComponentsLoader: () => Promise<CategoryTypes[]> = async () => {
  return fetchKits();
};

export const ComponentShowLoader = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  // Check if this is an advanced_table section route using the request URL
  const requestUrl = new URL(request.url);
  const isAdvancedTableSection = requestUrl.pathname.includes(
    "/kits/advanced_table/",
  );
  
  // Get platform from route params (react, rails); legacy swift → rails
  const rawPlatform =
    typeof params.platform === "string" && params.platform.length > 0
      ? params.platform
      : "react";
  const platform = rawPlatform === "swift" ? "rails" : rawPlatform;

  let url: string;
  if (isAdvancedTableSection) {
    // For advanced_table sections like /kits/advanced_table/default/react
    // params.name is the section name, fetch from advanced_table with section param
    url = `/kits/advanced_table/${params.name}/${platform}.json`;
  } else {
    // Normal kit route
    url = `/kits/${params.name}/${platform}.json`;
  }

  // Forward query params (e.g. ?sort=) so Rails ERB examples can re-render
  // with params["sort"] after the SPA migration. Without this, sort_menu demos
  // stay static because examples are prerendered into the JSON payload.
  if (requestUrl.search) {
    url = `${url}${requestUrl.search}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const CategoryLoader: (
  props: LoaderFunctionArgs
) => Promise<ComponentTypes> = async ({ params }) => {
  const { kits } = await fetchKits();

  const filteredData = kits.find(
    (kit: CategoryTypes) => kit.category === params.category
  );

  filteredData.components.sort(sortByName);

  return filteredData;
};

export const GuidesLoader = async () => {
  return fetchKits();
};

export const GuidePageLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const guidePath = params.page;
  const { pathname } = new URL(request.url);
  const guideType = pathname.includes('getting_started') ? 'getting_started' : 'design_guidelines';
  const response = await fetch(`/guides/${guideType}/${guidePath}.json`);
  const data = await response.json();
  return data;
};

let iconsCache: any = null;

export const IconsLoader = async () => {
  if (iconsCache) return iconsCache;
  const response = await fetch("/icons.json");
  const data = await response.json();
  iconsCache = data;
  return data;
};

let playgroundCache: any = null;

export const PlaygroundLoader = async () => {
  // Production never loads Playground payloads — UI redirects to staging / shows VPN dialog.
  // Avoids fetching /playground.json before that gate runs.
  if (isProductionHost()) {
    return {
      playground_kits: [],
      global_props_schema: null,
    };
  }

  if (playgroundCache) return playgroundCache;
  const response = await fetch("/playground.json");
  if (!response.ok) {
    return {
      playground_kits: [],
      global_props_schema: null,
    };
  }
  const data = await response.json();
  playgroundCache = data;
  return data;
};
