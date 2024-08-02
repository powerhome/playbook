(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sample-show"],{

/***/ "./app/javascript/packs/sample-show.js":
/*!*********************************************!*\
  !*** ./app/javascript/packs/sample-show.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#toggle-button-js').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.pb--codeCopy').classList.toggle('close');
  });
  document.addEventListener('click', function (e) {
    var openDrawer = document.querySelector('.pb--codeCopy');
    var codeToggle = document.querySelector('#toggle-button-js');
    if (!(e.target == openDrawer || openDrawer.contains(e.target) || e.target == codeToggle || codeToggle.contains(e.target))) {
      openDrawer.classList.add('close');
    }
  });
  document.querySelector('#fullscreen-toggle').addEventListener('click', function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.querySelector('#sample-card').requestFullscreen();
    }
  });
  var setClipboard = function setClipboard(value) {
    var tempInput = document.createElement('textarea');
    tempInput.style = 'position: absolute; left: -1000px; top: -1000px';
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };
  document.querySelector('.copy-clipboard').addEventListener('click', function () {
    var copyText = document.querySelector('.hiddenCodeforCopy').textContent;
    setClipboard(copyText);
  });
});

/***/ })

},[["./app/javascript/packs/sample-show.js","runtime"]]]);
//# sourceMappingURL=sample-show-b44fb630d54b488d2eb7.chunk.js.map