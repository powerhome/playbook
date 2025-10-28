document.addEventListener("DOMContentLoaded", () => {
  const viewHeight = window.innerHeight;
  document.querySelector("#show-code-sample").style.display = "none";

  document.querySelector("#toggle-button-js").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".pb--codeCopy").classList.toggle("close");

    const codeSample = document.querySelector("#show-code-sample");
    const sampleToggle = document.querySelector("#sample-card-body");
    if (codeSample.style.display === "none") {
      codeSample.style.display = "block";
      sampleToggle.style.display = "none";
      document.documentElement.style.height = viewHeight + "px";
    } else {
      codeSample.style.display = "none";
      sampleToggle.style.display = "block";
    }
  });

  document.querySelector("#fullscreen-toggle").addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.querySelector("#sample-card").requestFullscreen();
    }
  });

  const setClipboard = (value) => {
    var tempInput = document.createElement("textarea");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  document.querySelector(".copy-clipboard").addEventListener("click", () => {
    var copyText = document.querySelector(".hiddenCodeforCopy").textContent;
    setClipboard(copyText);
  });
});
