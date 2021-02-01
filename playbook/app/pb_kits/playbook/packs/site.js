// Move to separate file
// window.addEventListener('DOMContentLoaded', function() {
//   document.querySelectorAll('[data-toggle]').forEach(function(toggle) {
//     toggle.addEventListener('click', function(e) {
//       e.preventDefault()

//       var kitContainer = window.$(this).closest('.pb--doc')
//       var toggleTarget = window.$(this).data('toggle')

//       window
//         .$(kitContainer)
//         .find('[data-action="toggle"]')
//         .hide()
//       window
//         .$(kitContainer)
//         .find('[data-togglable="' + toggleTarget + '"]')
//         .show()
//     })
//   })
// })

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

    // openToggle.addEventListener('click', (e)=> toggleLambda(wrapper.querySelector('.pb--codeCopy')))
    // closeToggle.addEventListener('click', (e)=> toggleLambda(wrapper.querySelector('.pb--codeCopy')))
    openToggle.addEventListener('click', ()=> toggleLambda(codeDrawer))
    closeToggle.addEventListener('click', ()=> toggleLambda(codeDrawer))
  })
})