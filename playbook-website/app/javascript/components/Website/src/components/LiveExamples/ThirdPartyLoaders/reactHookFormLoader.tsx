import { ThirdPartyLoader, ThirdPartyScope, parseNamedImportsFor } from "./utilities"

export const reactHookFormLoader: ThirdPartyLoader = {
  id: "react-hook-form",
  detect: (_raw, _defaults, sources) => sources.includes("react-hook-form"),

  load: async (raw) => {
    const scope: ThirdPartyScope = {}

    const mod: any = await import("react-hook-form")
    
    // Add commonly used exports
    if (mod.useForm) scope.useForm = mod.useForm
    if (mod.useController) scope.useController = mod.useController
    if (mod.useFormContext) scope.useFormContext = mod.useFormContext
    if (mod.useWatch) scope.useWatch = mod.useWatch
    if (mod.useFieldArray) scope.useFieldArray = mod.useFieldArray
    if (mod.Controller) scope.Controller = mod.Controller
    if (mod.FormProvider) scope.FormProvider = mod.FormProvider

    // Handle any named imports from the source
    const namedImports = parseNamedImportsFor(raw, "react-hook-form")
    namedImports.forEach(({ exported, local }) => {
      if (mod[exported]) {
        scope[local] = mod[exported]
      }
    })

    return scope
  },
}
