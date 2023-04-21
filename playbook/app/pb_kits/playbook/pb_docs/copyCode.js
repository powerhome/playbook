const copyContent = (content) => {
  console.log('click')
  const copyText = document.createElement("textarea")

  copyText.value = content
  document.body.appendChild(copyText)
  copyText.select()
  // document.execCommand("copy")
  navigator.clipboard.writeText(content);
  document.body.removeChild(copyText)
}

export default copyContent;
