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

export const ComponentsLoader: () => Promise<CategoryTypes[]> = async () => {
  const response = await fetch("/kits.json");
  const data = await response.json();

  data.kits.forEach(sortComponentsByName);

  return data;
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
  const response = await fetch("/kits.json");
  const { kits } = await response.json();

  const filteredData = kits.find(
    (kit: CategoryTypes) => kit.category === params.category
  );

  filteredData.components.sort(sortByName);

  return filteredData;
};

export const GuidesLoader = async () => {
  const response = await fetch("/kits.json");
  const data = await response.json();
  return data;
};

export const GuidePageLoader = async ({ params }: any) => {
  const guidePath = params.page;
  const guideType = window.location.pathname.includes('getting_started') ? 'getting_started' : 'design_guidelines';
  const response = await fetch(`/guides/${guideType}/${guidePath}.json`);
  const data = await response.json();
  return data;
};
