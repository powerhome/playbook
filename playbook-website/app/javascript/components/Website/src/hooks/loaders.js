export const ComponentsLoader = async () => {
  const response = await fetch('/beta/kits.json')
  const data = await response.json()
  return data
}
