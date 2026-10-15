import { GenericObject } from "../../types";

export const matchesOptionExactly = (option: GenericObject | undefined, query: string): boolean => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!option || !normalizedQuery) return false;

  const optionValues = [option.label, option.value, option.id];
  return optionValues.some((value) => (
    value != null && String(value).trim().toLowerCase() === normalizedQuery
  ));
};

export const getCreationOption = (query: string, options: GenericObject[]): GenericObject | null => {
  const text = query.trim();
  if (!text) return null;

  const optionExists = options.some((option) => matchesOptionExactly(option, text));
  if (optionExists) return null;

  return { id: text, label: text, value: text, __isNew__: true };
};
