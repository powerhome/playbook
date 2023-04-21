window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#code-wrapper').forEach((wrapper) => {
    const showCodeButton = wrapper.querySelector('#code-example-button')
    const codeDrawer = wrapper.querySelector('.pb--codeCopy')
    const showCodeButtonContent = showCodeButton.querySelector('#code-example-button-content')
    const openExampleIcon = showCodeButton.querySelector('#code-example-open-icon')
    const closeExampleIcon = showCodeButton.querySelector('#code-example-close-icon')

    const toggleLambda = (elements) => {
      elements.forEach((element) =>
        element.style.display === 'none'
          ? (element.style.display = 'block')
          : (element.style.display = 'none')
      )
    }

    showCodeButton.addEventListener('click', () => {
      showCodeButtonContent.innerHTML === 'Show code'
        ? showCodeButtonContent.innerHTML = 'Close code'
        : showCodeButtonContent.innerHTML = 'Show code'
      toggleLambda([closeExampleIcon, openExampleIcon, codeDrawer])
    })
  })

  if (process.env.NODE_ENV === 'development') {
    require('../utilities/accessibility').runAxe()
  }
})
