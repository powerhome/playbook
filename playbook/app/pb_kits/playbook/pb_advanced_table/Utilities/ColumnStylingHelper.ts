export const findColumnDefByAccessor = (
  defs: any[],
  targetAccessor: string
): any | undefined => {
  for (const def of defs) {
    if (def.accessor === targetAccessor) {
      return def;
    }
    if (Array.isArray(def.columns) && def.columns.length) {
      const found = findColumnDefByAccessor(def.columns, targetAccessor);
      if (found) return found;
    }
  }
  return undefined;
};
