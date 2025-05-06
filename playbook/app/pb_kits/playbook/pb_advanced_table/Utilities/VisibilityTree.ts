export const buildVisibilityTree = (
  defs: any[],
  allowed?: string[] | null
): { id: string; label: string; children?: any[] }[] =>
  defs
    .map((def) => {
      // leaf column
      if (!def.columns || def.columns.length === 0) {
        if (allowed && allowed.length && !allowed.includes(def.id)) return null;
        return { id: def.id, label: def.label };
      }

      // column group
      const children = buildVisibilityTree(def.columns, allowed).filter(
        Boolean
      );
      if (children.length === 0) return null;

      return { id: def.id, label: def.label, children };
    })
    .filter(Boolean);
