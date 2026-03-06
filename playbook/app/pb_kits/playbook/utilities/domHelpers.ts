type ToggleVisibilityOptions = {
  isVisible: boolean,
  onHide: () => void,
  onShow: () => void,
}

type ArrowVisibilityOptions = {
  rootElement: ParentNode,
  downSelector: string,
  upSelector: string,
  showDownArrow: boolean,
  displayValue?: string,
}

export const toggleVisibility = ({ isVisible, onHide, onShow }: ToggleVisibilityOptions): boolean => {
  if (isVisible) {
    onHide()
    return false
  }

  onShow()
  return true
}

export const getElementHeight = (element: HTMLElement, displayValue = 'block'): string => {
  const originalDisplay = element.style.display
  element.style.display = displayValue
  const height = `${element.scrollHeight}px`
  element.style.display = originalDisplay
  return height
}

export const setArrowVisibility = ({
  rootElement,
  downSelector,
  upSelector,
  showDownArrow,
  displayValue = 'inline-block',
}: ArrowVisibilityOptions): void => {
  const downArrow = rootElement.querySelector<HTMLElement>(downSelector)
  const upArrow = rootElement.querySelector<HTMLElement>(upSelector)

  if (downArrow) {
    downArrow.style.display = showDownArrow ? displayValue : 'none'
  }

  if (upArrow) {
    upArrow.style.display = showDownArrow ? 'none' : displayValue
  }
}
