import { ThirdPartyLoader, ThirdPartyScope, parseNamedImportsFor } from "./utilities"

export const tiptapLoader: ThirdPartyLoader = {
  id: "tiptap",
  detect: (_raw, _defaults, sources) =>
    sources.includes("@tiptap/react") ||
    sources.includes("@tiptap/starter-kit") ||
    sources.includes("@tiptap/extension-link"),

  load: async (raw, defaults, _sources) => {
    const scope: ThirdPartyScope = {}

    const reactMod: any = await import("@tiptap/react")
    const reactNamed = parseNamedImportsFor(raw, "@tiptap/react")
    scope.useEditor = reactMod.useEditor
    scope.EditorContent = reactMod.EditorContent
    reactNamed.forEach(({ exported, local }) => {
      if (exported === "useEditor") scope[local] = reactMod.useEditor
      if (exported === "EditorContent") scope[local] = reactMod.EditorContent
    })

    const starterMod: any = await import("@tiptap/starter-kit")
    const StarterKit = starterMod.default ?? starterMod.StarterKit ?? starterMod
    scope.StarterKit = StarterKit
    const starterAlias = defaults.find((d) => d.source === "@tiptap/starter-kit")?.local
    if (starterAlias && starterAlias !== "StarterKit") scope[starterAlias] = StarterKit

    const linkMod: any = await import("@tiptap/extension-link")
    const Link = linkMod.default ?? linkMod.Link ?? linkMod
    scope.Link = Link
    const linkAlias = defaults.find((d) => d.source === "@tiptap/extension-link")?.local
    if (linkAlias && linkAlias !== "Link") scope[linkAlias] = Link

    const HorizontalRuleMod: any = await import("@tiptap/extension-horizontal-rule")
    const HorizontalRule = HorizontalRuleMod.default ?? HorizontalRuleMod.HorizontalRule ?? HorizontalRuleMod
    scope.HorizontalRule = HorizontalRule
    const horizontalRuleAlias = defaults.find((d) => d.source === "@tiptap/extension-horizontal-rule")?.local
    if (horizontalRuleAlias && horizontalRuleAlias !== "HorizontalRule") scope[horizontalRuleAlias] = HorizontalRule

    const HighlightMod: any = await import("@tiptap/extension-highlight")
    const Highlight = HighlightMod.default ?? HighlightMod.Highlight ?? HighlightMod
    scope.Highlight = Highlight
    const highlightAlias = defaults.find((d) => d.source === "@tiptap/extension-highlight")?.local
    if (highlightAlias && highlightAlias !== "Highlight") scope[highlightAlias] = Highlight

    const ParagraphMod: any = await import("@tiptap/extension-paragraph")
    const Paragraph = ParagraphMod.default ?? ParagraphMod.Paragraph ?? ParagraphMod
    scope.Paragraph = Paragraph
    const paragraphAlias = defaults.find((d) => d.source === "@tiptap/extension-paragraph")?.local
    if (paragraphAlias && paragraphAlias !== "Paragraph") scope[paragraphAlias] = Paragraph

    const DocumentMod: any = await import("@tiptap/extension-document")
    const Document = DocumentMod.default ?? DocumentMod.Document ?? DocumentMod
    scope.Document = Document
    const documentAlias = defaults.find((d) => d.source === "@tiptap/extension-document")?.local
    if (documentAlias && documentAlias !== "Document") scope[documentAlias] = Document

    const TextMod: any = await import("@tiptap/extension-text")
    const Text = TextMod.default ?? TextMod.Text ?? TextMod
    scope.Text = Text
    const textAlias = defaults.find((d) => d.source === "@tiptap/extension-text")?.local
    if (textAlias && textAlias !== "Text") scope[textAlias] = Text



    return scope
  },
}