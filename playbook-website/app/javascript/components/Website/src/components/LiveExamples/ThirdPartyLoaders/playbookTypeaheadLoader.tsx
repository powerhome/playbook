import { ThirdPartyLoader, ThirdPartyScope } from "./utilities"

const TYPEAHEAD_SOURCES = [
  "_typeahead",
  "playbook-ui/typeahead",
]

export const playbookTypeaheadLoader: ThirdPartyLoader = {
  id: "playbook-typeahead",
  detect: (_raw, defaults, sources) =>
    defaults.some((d) =>
      TYPEAHEAD_SOURCES.some((src) => d.source.includes(src))
    ) ||
    sources.some((source) =>
      TYPEAHEAD_SOURCES.some((src) => source.includes(src))
    ),
  load: async (_raw, defaults) => {
    const scope: ThirdPartyScope = {}

    try {
      // @ts-ignore - playbook-ui/typeahead is resolved via Vite alias
      const typeaheadMod: any = await import("playbook-ui/typeahead")

      if (typeaheadMod.Typeahead) {
        scope.Typeahead = typeaheadMod.Typeahead
      }

      for (const d of defaults) {
        if (
          TYPEAHEAD_SOURCES.some((src) => d.source.includes(src)) &&
          d.local !== "Typeahead"
        ) {
          scope[d.local] = typeaheadMod.Typeahead
        }
      }
    } catch (e) {
      console.warn("Failed to load playbook-ui/typeahead:", e)
    }

    return scope
  },
}
