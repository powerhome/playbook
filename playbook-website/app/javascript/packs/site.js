window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#code-wrapper').forEach((wrapper) => {
    const codeDrawer = wrapper.querySelector('.pb--codeCopy')
    const openExampleIcon = wrapper.querySelector('#code-example-open-icon')
    const closeExampleIcon = wrapper.querySelector('#code-example-close-icon')

    const handleToggleExample = () => {
      codeDrawer.style.display === 'none'
        ? (codeDrawer.style.display = 'block')
        : (codeDrawer.style.display = 'none')

      openExampleIcon.classList.toggle('display--none')
      closeExampleIcon.classList.toggle('display--none')
    }

    openExampleIcon.addEventListener('click', () => handleToggleExample())
    closeExampleIcon.addEventListener('click', () => handleToggleExample())
  })

  if (process.env.NODE_ENV === 'development') {
    require('../utilities/accessibility').runAxe()
  }
})
