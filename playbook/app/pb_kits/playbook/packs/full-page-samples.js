document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".compress").style.display = "none"

  document.querySelector(".toggle-button-js").addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector(".pb--codeCopy").classList.toggle("close")
  })

  document.querySelector(".expand").addEventListener("click", () => {
    document.querySelector(".sample-nav").style.display = "none"
    document.querySelector(".compress").style.display = "inline-block"
  })

  document.querySelector(".compress").addEventListener("click", () => {
    document.querySelector(".sample-nav").style.display = "flex"
    document.querySelector(".compress").style.display = "none"
  })

  const setClipboard = (value) => {
    var tempInput = document.createElement("textarea")
    tempInput.style = "position: absolute; left: -1000px; top: -1000px"
    tempInput.value = value
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand("copy")
    document.body.removeChild(tempInput)
  }

  document.querySelector(".copy-clipboard").addEventListener("click", () => {
    var copyText = document.querySelector(".hiddenCodeforCopy").textContent
    setClipboard(copyText)
  })
})
