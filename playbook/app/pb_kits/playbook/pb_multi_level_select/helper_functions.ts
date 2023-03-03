export const findItemById = (items: { [key: string]: any }[], id: string) :any => {
    for (const item of items) {
      if (item.id === id) {
        return item
      }
      if (item.children) {
        const found = findItemById(item.children, id)
        if (found) {
          return found
        }
      }
    }
    return null
}
  

export const checkIt = (foundItem: { [key: string]: any }) => {
    foundItem.children && (
      foundItem.children.map((x: { [key: string]: any }) => {
      x.checked = true
      x.children && (checkIt(x))
      return x
    })
    )
}

export const unCheckIt = (foundItem: { [key: string]: any }) => {
    foundItem.children && (
      foundItem.children.map((x: any) => {
      x.checked = false
      x.children && (unCheckIt(x))
      return x
    })
    )
}
