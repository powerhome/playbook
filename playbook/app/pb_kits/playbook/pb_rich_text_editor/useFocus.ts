const useFocus = () => {
  const allTrixEditors = document.querySelectorAll(
    '.focus-editor-targets trix-editor'
  )
  allTrixEditors.forEach((editorElement) => {
    const toolbarElement = editorElement.toolbarElement
    if (editorElement == document.activeElement) {
      editorElement.classList.add('focused-editor')
      toolbarElement.style.display = 'block'
    } else {
      // don't hide the toolbar if we've unfocused to focus on the link dialog.
      if (!toolbarElement.contains(document.activeElement)) {
        editorElement.classList.remove('focused-editor')
        toolbarElement.style.display = 'none'
      }
    }
  })
}

export default useFocus
