import { LoaderFunctionArgs } from "react-router-dom";

interface ComponentTypes {
  name: string;
  platforms: string[];
  description: string;
}

interface CategoryTypes {
  name: string;
  description: string;
  components: ComponentTypes[];
}

const sortByName = (a: ComponentTypes, b: ComponentTypes) =>
  a.name.localeCompare(b.name);

const sortComponentsByName = (kitCategory: CategoryTypes) => {
  kitCategory.components.sort(sortByName);
};

export const ComponentsLoader: () => Promise<CategoryTypes[]> = async () => {
  const response = await fetch("/beta/kits.json");
  const data = await response.json();
 
  data.kits.sort(sortByName).forEach(sortComponentsByName);

  return data;
};

export const CategoryLoader: (
  props: LoaderFunctionArgs
) => Promise<ComponentTypes> = async ({ params }) => {
  const response = await fetch("/beta/kits.json");
  const { kits } = await response.json();

  const filteredData = kits.filter(
    (kit: ComponentTypes) => kit.name === params.name
  )[0];

  filteredData.components.sort(sortByName);

  return filteredData;
};

