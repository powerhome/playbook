const copyContent = (content) => {
  const copyText = document.createElement('textarea')
  copyText.value = content
  document.body.appendChild(copyText)
  copyText.select()
  navigator.clipboard.writeText(content)
  document.body.removeChild(copyText)
}

export default copyContent
