import { ThirdPartyLoader, ThirdPartyScope } from "./utilities"

const ADVANCED_TABLE_SOURCES = [
  "_advanced_table",
  "playbook-ui/advanced-table",
]

export const playbookAdvancedTableLoader: ThirdPartyLoader = {
  id: "playbook-advanced-table",
  detect: (_raw, defaults, sources) =>
    defaults.some((d) =>
      ADVANCED_TABLE_SOURCES.some((src) => d.source.includes(src))
    ) ||
    sources.some((source) =>
      ADVANCED_TABLE_SOURCES.some((src) => source.includes(src))
    ),
  load: async (_raw, defaults) => {
    const scope: ThirdPartyScope = {}

    try {
      // @ts-ignore - playbook-ui/advanced-table is resolved via Vite alias
      const advancedTableMod: any = await import("playbook-ui/advanced-table")

      if (advancedTableMod.AdvancedTable) {
        scope.AdvancedTable = advancedTableMod.AdvancedTable
      }

      for (const d of defaults) {
        if (
          ADVANCED_TABLE_SOURCES.some((src) => d.source.includes(src)) &&
          d.local !== "AdvancedTable"
        ) {
          scope[d.local] = advancedTableMod.AdvancedTable
        }
      }
    } catch (e) {
      console.warn("Failed to load playbook-ui/advanced-table:", e)
    }

    return scope
  },
}
