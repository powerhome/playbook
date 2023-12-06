export const ComponentsLoader = async () => {
  const response = await fetch('/beta/kits.json')
  const data = await response.json()
  return data
}

export const CategoryLoader = async ({params}) => {
  const response = await fetch('/beta/kits.json')
  const { kits } = await response.json()

  return kits.filter(kit => kit.name === params.name)[0] 
}
