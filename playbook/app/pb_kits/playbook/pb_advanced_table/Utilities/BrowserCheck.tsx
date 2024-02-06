//Checking browser. Using this to add classname and css for browser specific issues with table borders
export const isChrome = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes("chrome") && !userAgent.includes("edg")
}