import { GenericObject } from "../../types";

export const getCreationOption = (query: string, options: GenericObject[]): GenericObject | null => {
  const text = query.trim();
  const normalized = text.toLowerCase();
  if (!text || options.some((option) => [option.label, option.value, option.id].some(
    (value) => value != null && String(value).trim().toLowerCase() === normalized
  ))) return null;

  return { id: text, label: text, value: text, __isNew__: true };
};
