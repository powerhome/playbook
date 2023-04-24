window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#code-wrapper').forEach((wrapper) => {
    const openToggle = wrapper.querySelector('#toggle-open')
    const codeDrawer = wrapper.querySelector('.pb--codeCopy')

    const toggleLambda = (element) => {
      if (element.style.display === 'none') {
        element.style.display = 'block'
      } else {
        element.style.display = 'none'
      }
    }

    openToggle.addEventListener('click', () => {
      const buttonContent = openToggle.getElementsByClassName('pb_button_content')[0]
      buttonContent.innerHTML === 'Show code'
        ? (buttonContent.innerHTML = 'Close code')
        : (buttonContent.innerHTML = 'Show code')
      toggleLambda(codeDrawer)
    })
  })

  if (process.env.NODE_ENV === 'development') {
    require('../utilities/accessibility').runAxe()
  }
})
