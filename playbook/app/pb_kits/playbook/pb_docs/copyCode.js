const copyContent = (content) => {
  const copyText = document.createElement("textarea")
  copyText.value = content
  document.body.appendChild(copyText)
  copyText.select()
  document.execCommand("copy")
  document.body.removeChild(copyText)
}

export default copyContent;
