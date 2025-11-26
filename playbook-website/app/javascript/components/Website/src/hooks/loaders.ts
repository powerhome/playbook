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

export const ComponentShowLoader = async ({ params }:any) => {
  const response = await fetch(`/beta/kits/${params.name}.json`);
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
