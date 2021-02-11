window.addEventListener('DOMContentLoaded', ()=> {
  document.querySelectorAll('#code-wrapper').forEach((wrapper)=> {
    const openToggle = wrapper.querySelector('#toggle-open')
    const closeToggle = wrapper.querySelector('#toggle-close')
    const codeDrawer = wrapper.querySelector('.pb--codeCopy')
    
    const toggleLambda = (element) => {
      if(element.style.display === "none") {
        element.style.display = "block"
      } else { 
        element.style.display = "none"
      }
    }

    openToggle.addEventListener('click', ()=> toggleLambda(codeDrawer))
    closeToggle.addEventListener('click', ()=> toggleLambda(codeDrawer))
  })
})