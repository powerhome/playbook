// import fs from "fs";

// const ProximaNovaBlack = "../../../../site_styles/fonts/Proxima-Nova-Black.woff"
// const ProximaNovaThin = "../../../../site_styles/fonts/Proxima-Nova-Thin.woff"
// const ProximaNovaLight = "../../../../site_styles/fonts/Proxima-Nova-Light.woff"
// const ProximaNovaReg = "../../../../site_styles/fonts/Proxima-Nova-Reg.woff"
// const ProximaNovaSbold = "../../../../site_styles/fonts/Proxima-Nova-Sbold.woff"
// const ProximaNovaBold = "../../../../site_styles/fonts/Proxima-Nova-Bold.woff"
// const ProximaNovaXbold = "../../../../site_styles/fonts/Proxima-Nova-Xbold.woff"
// const ProximaNovaBlackIt = "../../../../site_styles/fonts/Proxima-Nova-Black-It.woff"
// const ProximaNovaThinIt = "../../../../site_styles/fonts/Proxima-Nova-Thin-It.woff"
// const ProximaNovaLightIt = "../../../../site_styles/fonts/Proxima-Nova-Light-It.woff"
// const ProximaNovaRegIt = "../../../../site_styles/fonts/Proxima-Nova-Reg-It.woff"
// const ProximaNovaSboldIt = "../../../../site_styles/fonts/Proxima-Nova-Sbold-It.woff"
// const ProximaNovaBoldIt = "../../../../site_styles/fonts/Proxima-Nova-Bold-It.woff"
// const ProximaNovaXboldIt = "../../../../site_styles/fonts/Proxima-Nova-Xbold-It.woff"

// const ProximaNovaBlackBase64 = fs.readFileSync(ProximaNovaBlack, "base64")
// const ProximaNovaThinBase64 = fs.readFileSync(ProximaNovaThin, "base64")
// const ProximaNovaLightBase64 = fs.readFileSync(ProximaNovaLight, "base64")
// const ProximaNovaRegBase64 = fs.readFileSync(ProximaNovaReg, "base64")
// const ProximaNovaSboldBase64 = fs.readFileSync(ProximaNovaSbold, "base64")
// const ProximaNovaBoldBase64 = fs.readFileSync(ProximaNovaBold, "base64")
// const ProximaNovaXboldBase64 = fs.readFileSync(ProximaNovaXbold, "base64")
// const ProximaNovaBlackItBase64 = fs.readFileSync(ProximaNovaBlackIt, "base64")
// const ProximaNovaThinItBase64 = fs.readFileSync(ProximaNovaThinIt, "base64")
// const ProximaNovaLightItBase64 = fs.readFileSync(ProximaNovaLightIt, "base64")
// const ProximaNovaRegItBase64 = fs.readFileSync(ProximaNovaRegIt, "base64")
// const ProximaNovaSboldItBase64 = fs.readFileSync(ProximaNovaSboldIt, "base64")
// const ProximaNovaBoldItBase64 = fs.readFileSync(ProximaNovaBoldIt, "base64")
// const ProximaNovaXboldItBase64 = fs.readFileSync(ProximaNovaXboldIt, "base64")

// const Fonts = `@font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaThinBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: normal;
//     font-weight: 100;
//   }
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaThinItBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: italic;
//     font-weight: 100;
//   }
  
//   // LIGHT
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaLightBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: normal;
//     font-weight: 300;
//   }
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaLightItBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: italic;
//     font-weight: 300;
//   }
  
//   // REGULAR
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaRegBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: normal;
//     font-weight: 400;
//   }
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaRegItBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: italic;
//     font-weight: 400;
//   }
  
//   // MEDIUM
//   // NOT USED BUT EQUAL TO 500
  
//   // SEMIBOLD
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaSboldBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: normal;
//     font-weight: 600;
//   }
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaSboldItBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: italic;
//     font-weight: 600;
//   }
  
//   // BOLD
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaBoldBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: normal;
//     font-weight: 700;
//   }
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaBoldItBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: italic;
//     font-weight: 700;
//   }
  
//   // EXTRABOLD
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaXboldBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: normal;
//     font-weight: 800;
//   }
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaXboldItBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: italic;
//     font-weight: 800;
//   }
  
//   // BLACK
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaBlackBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: normal;
//     font-weight: 900;
//   }
//   @font-face {
//     src: url(
//         "data:font/woff;base64,${ProximaNovaBlackItBase64}"
//     ) format('woff');
//     font-family: 'Proxima Nova';
//     font-style: italic;
//     font-weight: 900;
//   }
//   `

// export default Fonts
