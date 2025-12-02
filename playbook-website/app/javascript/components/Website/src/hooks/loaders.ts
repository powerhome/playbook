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
  const response = await fetch("/beta/kits.json");
  const data = await response.json();

  data.kits.forEach(sortComponentsByName);

  return data;
};

export const ComponentShowLoader = async ({ params, request }:any) => {
  // Check if this is an advanced_table section route using the request URL
  const requestUrl = new URL(request.url);
  const isAdvancedTableSection = requestUrl.pathname.includes('/kits/advanced_table/');
  
  let url;
  if (isAdvancedTableSection) {
    // For advanced_table sections like /kits/advanced_table/default/react
    // params.name is the section name, fetch from advanced_table with section param
    url = `/beta/kits/advanced_table.json?section=${params.name}`;
  } else {
    // Normal kit route
    url = `/beta/kits/${params.name}.json`;
  }
  
  const response = await fetch(url);
  const data = await response.json();  
  return data; 
};

export const CategoryLoader: (
  props: LoaderFunctionArgs
) => Promise<ComponentTypes> = async ({ params }) => {
  const response = await fetch("/beta/kits.json");
  const { kits } = await response.json();

  const filteredData = kits.find(
    (kit: CategoryTypes) => kit.category === params.category
  );

  filteredData.components.sort(sortByName);

  return filteredData;
};

export const GuidePageLoader = async ({ params }: any) => {
  const guidePath = params.page;
  const guideType = window.location.pathname.includes('getting_started') ? 'getting_started' : 'design_guidelines';
  const response = await fetch(`/beta/guides/${guideType}/${guidePath}.json`);
  const data = await response.json();
  return data;
};
