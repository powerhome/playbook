import React, { useState } from "react"
import MultiLevelSelect from "./_multi_level_select"

type ContainerProps = {
  className?: string
  data?: { [key: string]: string }
  id?: string
  onChange?: any
  treeData?: { [key: string]: string }[]
}
// const Container = (props: ContainerProps) => {
//   const { treeData } = props
//   const [formattedData, setFormattedData] = useState(treeData)

//   const iterateIt = (item2: any) => {
//     console.log("item2 from within the iterateIt function:", item2)
//     item2.children.map((x: any) => {
//       x.checked = true
//       x.children ? iterateIt(x) : null
//       return x
//     })
//   }
//   const onChange = (currentNode: any, selectedNodes: any) => {

//     formattedData.filter(currentNode._id == )

//     const filteredData = formattedData.filter((item: any) => item.id === currentNode._id);
//     filteredData.forEach((item: any) => {
//       item.children.map((item2: any) => {
//         item2.id === currentNode._id && item2.children ? iterateIt(item2) : null;
//         return item2;
//       });
//       setFormattedData([item]);
//     });

//     if (currentNode._children && currentNode.checked) {
//       console.log("currentNode's Children", currentNode._children)
//       console.log("currentNode.checked:", currentNode.checked)

//       filteredData.forEach((item: any) => {
//         // just powerhomeremodeling always (because it's the only item inside of formattedData)
//         console.log("item", item)

//         item.children.map((item2: any) => {
//         // item2 is only of those 5 main children

//         // if the current node
//           if (item2.id === currentNode._id && item2.children) {
//             console.log("currentNode._id", currentNode._id)

//             iterateIt(item2)
//           } else {
//             iterateIt()
//           }

//           return item2
//         })

//         setFormattedData([item])
//       })
//     }
//     console.log(selectedNodes)
//   }

//   return (
//     <MultiLevelSelect treeData={formattedData} onChange={onChange} {...props} />
//   )
// }

// export default Container

const findItemById = (items: any, id: any): any => {
  for (const item of items) {
    if (item.id === id) {
      console.log("item", item)


      return item
    }
    if (item.children) {
      const found = findItemById(item.children, id)
      if (found) {
        console.log("found", found)
        return found
      }
    }
  }
  return null
}

const Container = (props: ContainerProps) => {
  const { treeData } = props
  const [formattedData, setFormattedData] = useState(treeData)

  const iterateIt = (foundItem: any) => {
    console.log("foundItem before iteration", foundItem)
    foundItem.children.map((x: any) => {
      console.log("x", x)
      x.checked == true ? (x.checked = false) : (x.checked = true)
      x.children ? iterateIt(x) : null
      
      return x
    })
  }

  const onChange = (currentNode: any, selectedNodes: any) => {
    console.log("currentNode is triggering", currentNode)
    if (currentNode._children) {
      const updatedData = formattedData.filter((item: any) => {
        const foundItem = findItemById(item.children, currentNode._id)
        if (foundItem && foundItem.children) {
          console.log("foundItem", foundItem)
          foundItem.checked == true
            ? (foundItem.checked = false)
            : (foundItem.checked = true)
          iterateIt(foundItem)
          return true
        }
        return false
      })
      setFormattedData(updatedData)
    }
    console.log(selectedNodes)
  }

  return (
    <MultiLevelSelect treeData={formattedData} onChange={onChange} {...props} />
  )
}

export default Container
