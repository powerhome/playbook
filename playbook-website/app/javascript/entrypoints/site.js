window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#code-wrapper').forEach((wrapper) => {
    const openToggleOpened = wrapper.querySelector('#toggle-open-opened')
    const openToggleClosed = wrapper.querySelector('#toggle-open-closed')
    const codeDrawer = wrapper.querySelector('.pb--codeCopy')

    const toggleLambda = (element) => {
      if (element.style.display === 'none') {
        element.style.display = 'block'
        openToggleClosed.style.display = 'none'
        openToggleOpened.style.display = 'flex'
      } else {
        element.style.display = 'none'
        openToggleClosed.style.display = 'flex'
        openToggleOpened.style.display = 'none'
      }
    }

    openToggleOpened.addEventListener('click', () => toggleLambda(codeDrawer))
    openToggleClosed.addEventListener('click', () => toggleLambda(codeDrawer))
  })

  // if (process.env.NODE_ENV === 'development') {
  //   require('../utilities/accessibility').runAxe()
  // }
})
