import { GenericObject } from "../../types";

export const getCreationOption = (query: string, options: GenericObject[]): GenericObject | null => {
  const text = query.trim();
  if (!text) return null;

  const normalizedQuery = text.toLowerCase();
  const optionExists = options.some((option) => {
    const optionValues = [option.label, option.value, option.id];
    return optionValues.some((value) => (
      value != null && String(value).trim().toLowerCase() === normalizedQuery
    ));
  });
  if (optionExists) return null;

  return { id: text, label: text, value: text, __isNew__: true };
};
