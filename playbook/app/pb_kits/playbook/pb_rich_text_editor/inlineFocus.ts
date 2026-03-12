const inlineFocus = (event: Event) => {
  const trixEditorElement = event.target
  if (!(trixEditorElement instanceof Element)) return

  const trixEditorContainer = trixEditorElement.closest('.pb_rich_text_editor_kit')
  if (!trixEditorContainer?.classList.contains('inline')) return

  trixEditorContainer.classList.toggle('focused')
}

export default inlineFocus
