(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const solutionsContainer = document.querySelector('.solutionsContainer')
    const secondSolutionsCard = document.querySelector('.secondSolutionsCard')
    const verticalBar = document.querySelector('.vertical-bar')
    const solutionsContainerRect = solutionsContainer.getBoundingClientRect()
    const solutionsContainerMid = solutionsContainerRect.width / 2

    secondSolutionsCard.style.transform = `translateX(${solutionsContainerMid}px) translateY(0)`
    secondSolutionsCard.style.transition = 'none'

    let isDragging = false

    const setIsDragging = (boolean) => isDragging = boolean
    const dragVerticalBar = (e) => {
      if (!isDragging) return

      const solutionsContainerRectResponsive = solutionsContainer.getBoundingClientRect()
      let xTranslate = e.clientX - solutionsContainerRectResponsive.left

      if (xTranslate >= solutionsContainerRectResponsive.width - 5) {
        xTranslate = solutionsContainerRectResponsive.width - 5
      } else if (xTranslate <= 5) {
        xTranslate = 5
      }

      secondSolutionsCard.style.transform = `translateY(0px) translateX(${xTranslate}px)`
    }

    verticalBar.addEventListener('mousedown', () => {
      setIsDragging(true)
    })

    document.addEventListener('mouseup', () => {
      setIsDragging(false)
    })

    solutionsContainer.addEventListener('mousemove', (e) => {
      dragVerticalBar(e)
    })

    // Touchscreens
    verticalBar.addEventListener('touchstart', () => {
      setIsDragging(true)
    })

    document.addEventListener('touchend', () => {
      setIsDragging(false)
    })

    solutionsContainer.addEventListener('touchmove', (e) => {
      const touchEventData = e.touches[0]
      dragVerticalBar(touchEventData)
    })
  })
})()
