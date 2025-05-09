export interface VisibilityNode {
  id: string;
  label: string;
  children?: VisibilityNode[];
}
export const buildVisibilityTree = (
  defs: any[],
  allowed?: string[] | null
): VisibilityNode[] =>
  defs
    .map((def) => {
      const isGroup = Array.isArray(def.columns) && def.columns.length > 0;

      // No filter at all → keep it
      if (!allowed?.length) {
        return isGroup
          ? {
              id: def.id,
              label: def.label,
              children: buildVisibilityTree(def.columns, allowed),
            }
          : { id: def.id, label: def.label };
      }

      // 1️⃣ If *this* ID is explicitly allowed → keep it & all its children
      if (allowed.includes(def.id)) {
        return isGroup
          ? {
              id: def.id,
              label: def.label,
              children: buildVisibilityTree(def.columns, null),
            }
          : { id: def.id, label: def.label };
      }

      // Otherwise, if it’s a group, recurse & keep only if kids survive
      if (isGroup) {
        const kids = buildVisibilityTree(def.columns, allowed).filter(Boolean);
        return kids.length
          ? { id: def.id, label: def.label, children: kids }
          : null;
      }

      // Leaf not allowed → drop it
      return null;
    })
    .filter(Boolean);
