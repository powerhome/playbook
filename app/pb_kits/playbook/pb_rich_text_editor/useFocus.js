const useFocus = () => {
  document.querySelector('trix-editor').each((index, editorElement) => {
    var toolbarElement = editorElement.toolbarElement
    if (editorElement == document.activeElement) {
      $(toolbarElement).show()
    } else {
      // don't hide the toolbar if we've unfocused to focus on the link dialog.
      if (!toolbarElement.contains(document.activeElement)) {
        $(toolbarElement).hide()
      }
    }
  })
}

export default useFocus
