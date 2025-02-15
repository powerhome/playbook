document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#show-code-sample').style.display = 'none'

  document.querySelector('#toggle-button-js').addEventListener('click', (e) => {
    e.preventDefault()
    const codeSample = document.querySelector('#show-code-sample')
    if (codeSample.style.display === 'none') {
      codeSample.style.display = 'block'
      codeSample.scrollIntoView();
    } else {
      codeSample.style.display = 'none'
    }
  })

  document.querySelector('#fullscreen-toggle').addEventListener('click', () => {
    if (document.fullscreenElement){
      document.exitFullscreen()
    } else {
      document.querySelector('#sample-card').requestFullscreen()
    }
  })

  const setClipboard = (value) => {
    var tempInput = document.createElement('textarea')
    tempInput.style = 'position: absolute; left: -1000px; top: -1000px'
    tempInput.value = value
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
  }

  document.querySelector('.copy-clipboard').addEventListener('click', () => {
    var copyText = document.querySelector('.hiddenCodeforCopy').textContent
    setClipboard(copyText)
  })
})
