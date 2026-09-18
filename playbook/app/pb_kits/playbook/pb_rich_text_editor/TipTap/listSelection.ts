import { Editor } from "@tiptap/core"

type ListSelection = { from: number, to: number } | null

const getNormalizedListSelection = (editor: Editor): ListSelection => {
  const { selection } = editor.state

  if (selection.empty) return null

  const { $from, $to } = selection
  let { from, to } = selection

  if (
    $from.depth > 0 &&
    $from.parent.isTextblock &&
    $from.parentOffset === $from.parent.content.size
  ) {
    const nextBlockStart = $from.after($from.depth) + 1
    if (nextBlockStart < to) from = nextBlockStart
  }

  if (
    $to.depth > 0 &&
    $to.parent.isTextblock &&
    $to.parentOffset === 0
  ) {
    const previousBlockEnd = $to.before($to.depth) - 1
    if (previousBlockEnd > from) to = previousBlockEnd
  }

  return from === selection.from && to === selection.to ? null : { from, to }
}

const normalizeListSelection = (editor: Editor): void => {
  const initialSelection = editor.state.selection

  if (
    !initialSelection.empty &&
    initialSelection.$from.nodeBefore?.type.name === "hardBreak"
  ) {
    const selectedSize = initialSelection.to - initialSelection.from
    const breakPosition = initialSelection.from - 1

    editor.chain()
      .deleteRange({ from: breakPosition, to: initialSelection.from })
      .setTextSelection(breakPosition)
      .splitBlock()
      .run()

    const from = editor.state.selection.from
    editor.commands.setTextSelection({ from, to: from + selectedSize })
  }

  const selection = getNormalizedListSelection(editor)

  if (selection) editor.commands.setTextSelection(selection)
}

export { getNormalizedListSelection, normalizeListSelection }
