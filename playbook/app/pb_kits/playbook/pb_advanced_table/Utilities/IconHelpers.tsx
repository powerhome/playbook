// Logic for handling icons related props to allow for string OR array of strings
export const displayIcon = (icon: string | string[]) => {
    if (typeof icon === "string") {
      return [icon, icon]
    }
    return icon
  }
  