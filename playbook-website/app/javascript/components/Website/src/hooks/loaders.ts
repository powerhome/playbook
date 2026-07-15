import { LoaderFunctionArgs } from "react-router-dom";

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
  
  // Get platform from route params (react, rails, swift)
  const platform =
    typeof params.platform === "string" && params.platform.length > 0
      ? params.platform
      : "react";

  let url: string;
  if (isAdvancedTableSection) {
    // For advanced_table sections like /kits/advanced_table/default/react
    // params.name is the section name, fetch from advanced_table with section param
    url = `/kits/advanced_table/${params.name}/${platform}.json`;
  } else {
    // Normal kit route
    url = `/kits/${params.name}/${platform}.json`;
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
  if (playgroundCache) return playgroundCache;
  const response = await fetch("/playground.json");
  const data = await response.json();
  playgroundCache = data;
  return data;
};
