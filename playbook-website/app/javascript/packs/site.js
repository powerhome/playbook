window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#code-wrapper').forEach((wrapper) => {
    const openToggle = wrapper.querySelector('#toggle-open')
    const codeDrawer = wrapper.querySelector('.pb--codeCopy')

    const toggleLambda = (element) => {
      if (element.style.display === 'none') {
        element.style.display = 'block'
        openToggle.innerHTML = '<i class="far fa-times"></i> Close Code'
      } else {
        element.style.display = 'none'
        openToggle.innerHTML = '<i class="far fa-code"></i> Show Code'
      }
    }

    openToggle.addEventListener('click', () => toggleLambda(codeDrawer))
  })

  if (process.env.NODE_ENV === 'development') {
    require('../utilities/accessibility').runAxe()
  }
})
