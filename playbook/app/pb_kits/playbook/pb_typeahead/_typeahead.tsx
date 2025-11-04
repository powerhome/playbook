import React, { useState, useEffect, forwardRef, useRef} from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import CreateableSelect from 'react-select/creatable'
import AsyncCreateableSelect from 'react-select/async-creatable'
import { get, isString, uniqueId } from '../utilities/object'

import { globalProps, GlobalProps } from '../utilities/globalProps'
import classnames from 'classnames'

import {
  Control,
  ClearIndicator,
  IndicatorsContainer,
  MenuList,
  MultiValue,
  Option,
  Placeholder,
  ValueContainer,
} from "./components"

import * as kitComponents from "./components"

import { noop, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GenericObject, Noop } from '../types'

/**
 * @typedef {object} Props
 * @prop {boolean} async - whether Typeahead should fetch data from
 * a remote location to populate the options
 * @prop {string} label - the text for the optional typeahead input label
 * @prop {boolean} preserveSearchInput - whether to preserve the input value when the field loses focus
 */

type TypeaheadProps = {
  async?: boolean,
  className?: string,
  components?: GenericObject,
  createable?: boolean,
  dark?: boolean,
  data?: { [key: string]: string },
  disabled?: boolean,
  error?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  label?: string,
  loadOptions?: string | Noop,
  getOptionLabel?: string | (() => string),
  getOptionValue?: string | (() => string),
  name?: string,
  options?: Array<{ label: string; value?: string }>,
  marginBottom?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl",
  pillColor?: "primary" | "neutral" | "success" | "warning" | "error" | "info" | "data_1" | "data_2" | "data_3" | "data_4" | "data_5" | "data_6" | "data_7" | "data_8" | "windows" | "siding" | "roofing" | "doors" | "gutters" | "solar" | "insulation" | "accessories",
  onChange?: any,
  optionsByContext?: Record<string, Array<{ label: string; value?: string }>>
  required?: boolean,
  validation?: { message: string },
  searchContextSelector?: string,
  clearOnContextChange?: boolean,
  preserveSearchInput?: boolean,
} & GlobalProps

export type SelectValueType = {
  label: string,
  value: string,
  imageUrl?: string,
  pillColor?: string,
}

type TagOnChangeValues = {
  action?: string,
  option?: SelectValueType,
  removedValue?: string,
}

/**
 * @constant {React.ReactComponent} Typeahead
 * @param {TypeaheadProps} props - props as described at https://react-select.com/props
 */
const Typeahead = forwardRef<HTMLInputElement, TypeaheadProps>(({
  async,
  className,
  components = {},
  createable,
  error = "",
  data = {},
  disabled = false,
  getOptionLabel,
  getOptionValue,
  htmlOptions = {},
  id,
  name,
  loadOptions = noop,
  marginBottom = "sm",
  pillColor,
  onChange,
  optionsByContext = {},
  searchContextSelector,
  required = false,
  validation,
  clearOnContextChange = false,
  preserveSearchInput = false, // Default to false to maintain backward compatibility
  ...props
}: TypeaheadProps) => {
  // State to manage the input value when preserveSearchInput is true
  const [inputValue, setInputValue] = useState("")
  // State to track if form has been submitted to control validation display for react rendered rails kit
  const [formSubmitted, setFormSubmitted] = useState(false)
  // State to track if user has made a selection (to disable defaultValue focus behavior)
  const [hasUserSelected, setHasUserSelected] = useState(false)
  // Ref to track if we just clicked the footer button (to prevent menu from closing)
  const footerButtonClickedRef = useRef(false)

  // If preserveSearchInput is true, we need to control the input value
  const handleInputChange = preserveSearchInput
    ? (newValue: string, actionMeta: {action: string}) => {
        // Only update the input value for certain actions
        if (actionMeta.action === 'input-change') {
          setInputValue(newValue)
        } else if (actionMeta.action === 'menu-close' && !props.value) {
          // Don't clear the input when the menu closes without a selection
          // unless the component is controlled and has a value
        } else if (actionMeta.action === 'set-value') {
          // When an option is selected, clear the input
          setInputValue('')
        }

        // If the original onInputChange was provided, call it too
        if (props.onInputChange) {
          return props.onInputChange(newValue, actionMeta)
        }
        return newValue
      }
    : props.onInputChange

  // Handle blur events if we're preserving input
  const handleBlur = preserveSearchInput
    ? (event: React.FocusEvent<HTMLInputElement>) => {
        // Do not clear input on blur - the value is preserved in our state
        if (props.onBlur) {
          props.onBlur(event)
        }
      }
    : props.onBlur

  // Create a ref to access React Select instance
  const selectRef = useRef<any>(null)

  // Helper function to flatten grouped options if custom groups are used
  const flattenOptions = (options: any[]): any[] => {
    if (!options) return []
    
    return options.reduce((acc, option) => {
      if (option.options && Array.isArray(option.options)) {
        return [...acc, ...option.options]
      }
      return [...acc, option]
    }, [])
  }

  // Configure focus on selected option using React Select's API
  const handleMenuOpen = () => {
    setTimeout(() => {
      let currentValue = props.value || props.defaultValue

      // Handle react rendered rails version which passes arrays even for single selects
      if (Array.isArray(currentValue) && currentValue.length > 0) {
        currentValue = currentValue[0]
      }
      
      // Only apply custom focus if user has NOT made a selection yet
      if (currentValue && selectRef.current && !hasUserSelected && !props.isMulti) {

        const options = props.options
        if (options) {
          // Flatten grouped options to find the matching option and find matching option
          const flatOptions = flattenOptions(options)
          
          const targetOption = flatOptions.find((option: any) => {
            const optionValue = props.getOptionValue ? props.getOptionValue(option) : option.value
            const currentOptionValue = props.getOptionValue ? props.getOptionValue(currentValue) : currentValue.value
            return optionValue === currentOptionValue
          })
          
          if (targetOption) {
            // Use React Select's internal state to set focused option
            if (selectRef.current && selectRef.current.setState) {
              selectRef.current.setState({
                focusedOption: targetOption,
                focusedValue: null
              })
              
              // Handle scrolling so selected option is visible
              setTimeout(() => {
                if (selectRef.current && selectRef.current.menuListRef) {
                  const menuElement = selectRef.current.menuListRef
                  // Find the focused option using React Select's class
                  const focusedElement = menuElement.querySelector('.typeahead-kit-select__option--is-focused')
                  
                  if (focusedElement) {
                    const optionTop = focusedElement.offsetTop
                    const optionHeight = focusedElement.offsetHeight
                    const menuHeight = menuElement.clientHeight
                    
                    // Set the menu's scrollTop to position the selected option in the middle
                    const scrollToMiddle = optionTop - (menuHeight / 2) + (optionHeight / 2)
                    menuElement.scrollTop = Math.max(0, scrollToMiddle)
                  }
                }
              }, 20)
            }
          }
        }
      }
    }, 0)
    
    // Call original onMenuOpen if provided
    if (props.onMenuOpen) {
      props.onMenuOpen()
    }
  }

  // Handle keyboard navigation to footer button
  useEffect(() => {
    // Use a ref to track if we've already added the listener
    if ((window as any).__typeaheadKeyDownListener) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      
      // Handle Enter/Space on footer in capture phase BEFORE react-select processes it
      if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement as HTMLElement | null
        if (activeElement && activeElement.tagName === 'INPUT' && activeElement.getAttribute('role') === 'combobox') {
          const input = activeElement as HTMLInputElement
          const menu = input.closest('.typeahead-kit-select__menu')
          if (menu) {
            const menuList = menu.querySelector('.typeahead-kit-select__menu-list') as HTMLElement | null
            if (menuList) {
              const footerWrapper = menuList.querySelector('[data-footer-wrapper]') as HTMLElement | null
              let footerId = footerWrapper?.getAttribute('id')
              const activeDescendantId = input.getAttribute('aria-activedescendant')
              
              // Also check if activeDescendantId matches footer pattern
              if (!footerId && activeDescendantId && activeDescendantId.startsWith('typeahead-footer-')) {
                footerId = activeDescendantId
                if (footerWrapper && !footerWrapper.getAttribute('id')) {
                  footerWrapper.setAttribute('id', footerId)
                }
              }
              
              // Check if we're on footer (either by ID match or pattern match)
              const isOnFooter = footerId && (
                activeDescendantId === footerId || 
                (activeDescendantId && activeDescendantId.startsWith('typeahead-footer-'))
              )
              
              if (isOnFooter) {
                const footerButton = footerWrapper.querySelector('button') as HTMLButtonElement | null
                if (footerButton) {
                  // Prevent react-select from processing this
                  e.preventDefault()
                  e.stopPropagation()
                  e.stopImmediatePropagation()
                  
                  // Mark that we're clicking the footer button
                  footerButtonClickedRef.current = true
                  
                  // Find the onClick handler by traversing React Fiber
                  const reactFiberKey = Object.keys(footerButton).find(key => key.startsWith('__reactFiber'))
                  let onClickHandler: ((e: any) => void) | null = null
                  
                  if (reactFiberKey) {
                    const reactFiber = (footerButton as any)[reactFiberKey]
                    let fiber = reactFiber
                    
                    while (fiber) {
                      if (fiber.memoizedProps && fiber.memoizedProps.onClick) {
                        onClickHandler = fiber.memoizedProps.onClick
                        break
                      }
                      if (fiber.stateNode && fiber.stateNode.props && fiber.stateNode.props.onClick) {
                        onClickHandler = fiber.stateNode.props.onClick
                        break
                      }
                      if (fiber.child && fiber.child.memoizedProps && fiber.child.memoizedProps.onClick) {
                        onClickHandler = fiber.child.memoizedProps.onClick
                        break
                      }
                      fiber = fiber.return
                    }
                  }
                  
                  // Call the handler directly
                  if (onClickHandler) {
                    try {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClickHandler({
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        preventDefault: () => {},
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        stopPropagation: () => {},
                        currentTarget: footerButton,
                        target: footerButton
                      } as any)
                    } catch (error) {
                      // Fallback to native click if handler fails
                      footerButton.click()
                    }
                  } else {
                    footerButton.click()
                  }
                  
                  // Immediately refocus input and keep menu open
                  setTimeout(() => {
                    input.focus()
                    input.setAttribute('aria-expanded', 'true')
                    const currentFooterId = footerWrapper.getAttribute('id') || footerId
                    if (currentFooterId) {
                      input.setAttribute('aria-activedescendant', currentFooterId)
                      footerWrapper.setAttribute('id', currentFooterId)
                    }
                    footerWrapper.classList.add('typeahead-kit-select__option--is-focused')
                  }, 0)
                  
                  return
                }
              }
            }
          }
        }
      }
      
      // Only handle arrow keys in the global listener
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
        return
      }

      // Only handle if we're actually navigating in a typeahead menu
      const activeElement = document.activeElement
      if (!activeElement) {
        return
      }

      // Find the input (either active element or focused input)
      const input = (activeElement.tagName === 'INPUT' && activeElement.getAttribute('role') === 'combobox') 
        ? activeElement as HTMLInputElement
        : document.querySelector('input[role="combobox"]:focus') as HTMLInputElement

      if (!input) {
        return
      }

      // Find menu using aria-controls or by searching from input's container
      const inputContainer = input.closest('.typeahead-kit-select') || input.closest('.pb_typeahead_kit')
      const menu = inputContainer?.querySelector('.typeahead-kit-select__menu') || 
                   document.querySelector('.typeahead-kit-select__menu') as HTMLElement

      if (!menu) {
        return
      }

      const menuList = menu.querySelector('.typeahead-kit-select__menu-list') as HTMLElement
      if (!menuList) {
        return
      }

      // Get all regular options (excluding footer) - we'll use this for both ArrowUp and ArrowDown
      const allOptions = Array.from(menuList.querySelectorAll('.typeahead-kit-select__option'))
        .filter(el => {
          // Filter out elements that are in the footer wrapper
          return !el.closest('[data-footer-wrapper]') && !el.closest('[class*="footer"]')
        }) as HTMLElement[]

      if (allOptions.length === 0) return

      const activeDescendantId = input.getAttribute('aria-activedescendant')
      const footerWrapper = menuList.querySelector('[data-footer-wrapper]') as HTMLElement
      let footerId = footerWrapper?.getAttribute('id')
      
      // If activeDescendantId points to a footer but footer doesn't have ID, restore it
      if (!footerId && activeDescendantId && activeDescendantId.startsWith('typeahead-footer-')) {
        // Footer ID might have been removed, restore it from activeDescendantId
        footerId = activeDescendantId
        // Re-add the ID to the footer wrapper if it exists
        if (footerWrapper) {
          footerWrapper.setAttribute('id', footerId)
        }
      }
      
      // Check if footer is currently active
      // Also check if activeDescendantId matches footer pattern even if footerId is null
      const isFooterActive = !!(footerWrapper && (
        (footerId && activeDescendantId === footerId) || 
        (activeDescendantId && activeDescendantId.startsWith('typeahead-footer-'))
      ))
      
      // Helper to clean up any footer enforcement (intervals and observers stored on input)
      const cleanupFooterEnforcement = () => {
        const cleanup = (input as any).__footerCleanup
        if (cleanup && typeof cleanup === 'function') {
          try {
            cleanup()
          } catch (error) {
            // Ignore errors in cleanup
          }
          delete (input as any).__footerCleanup
        }
      }

      // Handle ArrowDown: navigate to footer when on last option
      // This must run BEFORE the "navigate from footer" check so it can detect when we're back on last option
      if (e.key === 'ArrowDown' && !isFooterActive) {
        // Find which option is currently focused
        const focusedOption = allOptions.find(opt => 
          opt.getAttribute('id') === activeDescendantId ||
          opt.classList.contains('typeahead-kit-select__option--is-focused')
        )

        const lastOption = allOptions[allOptions.length - 1]
        const isOnLastOption = focusedOption === lastOption

        // If we're on the last option, navigate to footer
        if (isOnLastOption) {
          const footerButton = footerWrapper?.querySelector('button') as HTMLButtonElement
          
          if (footerButton) {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            // Ensure footer has ID and classes
            if (!footerWrapper.getAttribute('id')) {
              footerWrapper.setAttribute('id', `typeahead-footer-${Date.now()}`)
              footerWrapper.setAttribute('role', 'option')
              footerWrapper.classList.add('typeahead-kit-select__option')
            }
            
            const footerId = footerWrapper.getAttribute('id')
            if (!footerId) {
              return
            }
            
            // Remove background color from last option immediately (unless it's selected)
            if (lastOption && !lastOption.classList.contains('typeahead-kit-select__option--is-selected')) {
              lastOption.style.setProperty('background-color', 'transparent', 'important')
            }
            if (lastOption) {
              lastOption.classList.remove('typeahead-kit-select__option--is-focused')
            }
            
            // Set footer as active
            input.setAttribute('aria-activedescendant', footerId)
            footerWrapper.classList.add('typeahead-kit-select__option--is-focused')
            input.setAttribute('aria-expanded', 'true')
            
            // Aggressively enforce that last option background stays removed
            // Use both MutationObserver and setInterval to catch all cases
            const forceRemoveBackground = () => {
              if (!lastOption) return
              // Don't override background if the option is selected
              if (!lastOption.classList.contains('typeahead-kit-select__option--is-selected')) {
                lastOption.style.setProperty('background-color', 'transparent', 'important')
              }
              lastOption.classList.remove('typeahead-kit-select__option--is-focused')
            }
            
            // Also use MutationObserver to catch when react-select adds the class or style back
            const observer = new MutationObserver((mutations) => {
              const currentActiveDescendantId = input.getAttribute('aria-activedescendant')
              if (currentActiveDescendantId === footerId) {
                mutations.forEach(mutation => {
                  if (mutation.type === 'attributes') {
                    const target = mutation.target as HTMLElement
                    if (target === lastOption) {
                      // If react-select added the focused class back, remove it
                      if (target.classList.contains('typeahead-kit-select__option--is-focused')) {
                        forceRemoveBackground()
                      }
                      // If react-select set a background color, force it to transparent (unless selected)
                      if (!target.classList.contains('typeahead-kit-select__option--is-selected')) {
                        const bgColor = window.getComputedStyle(target).backgroundColor
                        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                          forceRemoveBackground()
                        }
                      }
                    }
                  }
                })
              }
            })
            
            observer.observe(lastOption, {
              attributes: true,
              attributeFilter: ['class', 'style']
            })
            
            // Continuously enforce that last option background stays removed
            // react-select will try to re-add the background, so we keep removing it
            const enforceInterval = setInterval(() => {
              const currentActiveDescendantId = input.getAttribute('aria-activedescendant')
              // Only enforce if footer is still active
              if (currentActiveDescendantId === footerId) {
                forceRemoveBackground()
              } else {
                // Footer is no longer active, stop enforcing
                clearInterval(enforceInterval)
                observer.disconnect()
                // Clean up - remove the inline style
                lastOption.style.removeProperty('background-color')
              }
            }, 10)
            
            // Handle Enter/Space on input to trigger footer button
            const handleFooterEnter = (enterEvent: KeyboardEvent) => {
              const currentActiveDescendant = input.getAttribute('aria-activedescendant')
              
              // Check if we're on footer (either by ID match or pattern match)
              const isOnFooter = currentActiveDescendant === footerId || 
                                (currentActiveDescendant && currentActiveDescendant.startsWith('typeahead-footer-'))
              
              if (isOnFooter && (enterEvent.key === 'Enter' || enterEvent.key === ' ')) {
                enterEvent.preventDefault()
                enterEvent.stopPropagation()
                enterEvent.stopImmediatePropagation()
                
                // Mark that we're clicking the footer button
                footerButtonClickedRef.current = true
                
                // Find the onClick handler by traversing React Fiber
                const reactFiberKey = Object.keys(footerButton).find(key => key.startsWith('__reactFiber'))
                let onClickHandler: ((e: any) => void) | null = null
                
                if (reactFiberKey) {
                  const reactFiber = (footerButton as any)[reactFiberKey]
                  let fiber = reactFiber
                  
                  while (fiber) {
                    if (fiber.memoizedProps && fiber.memoizedProps.onClick) {
                      onClickHandler = fiber.memoizedProps.onClick
                      break
                    }
                    if (fiber.stateNode && fiber.stateNode.props && fiber.stateNode.props.onClick) {
                      onClickHandler = fiber.stateNode.props.onClick
                      break
                    }
                    if (fiber.child && fiber.child.memoizedProps && fiber.child.memoizedProps.onClick) {
                      onClickHandler = fiber.child.memoizedProps.onClick
                      break
                    }
                    fiber = fiber.return
                  }
                }
                
                // Call the handler directly without triggering a native click event
                if (onClickHandler) {
                  try {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClickHandler({
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      preventDefault: () => {},
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      stopPropagation: () => {},
                      currentTarget: footerButton,
                      target: footerButton
                    } as any)
                  } catch (error) {
                    // Fallback to native click if handler fails
                    footerButton.click()
                  }
                } else {
                  // Fallback: click but immediately refocus input to keep menu open
                  footerButton.click()
                }
                
                // Immediately refocus input and keep menu open after handler runs
                setTimeout(() => {
                  input.focus()
                  input.setAttribute('aria-expanded', 'true')
                  const currentFooterId = footerWrapper.getAttribute('id') || footerId
                  if (currentFooterId) {
                    input.setAttribute('aria-activedescendant', currentFooterId)
                    footerWrapper.setAttribute('id', currentFooterId)
                  }
                  footerWrapper.classList.add('typeahead-kit-select__option--is-focused')
                }, 0)
                
                // Reset flag after handler completes (but keep it briefly for menu close prevention)
                // The flag will be reset when user navigates away from footer or selects an option
                setTimeout(() => {
                  // Only reset if still on footer (if user navigated away, onMenuClose will reset it)
                  const currentActiveDescendantId = input.getAttribute('aria-activedescendant')
                  const stillOnFooter = currentActiveDescendantId === footerId || 
                                       (currentActiveDescendantId && currentActiveDescendantId.startsWith('typeahead-footer-'))
                  if (!stillOnFooter) {
                    footerButtonClickedRef.current = false
                  }
                }, 100)
              }
            }
              
            input.addEventListener('keydown', handleFooterEnter, true)
            
            // Also reset flag when navigating away with arrow keys
            const handleArrowAway = (arrowEvent: KeyboardEvent) => {
              const currentActive = input.getAttribute('aria-activedescendant')
              // If we navigated away from footer (not on footer anymore), reset the flag
              if ((arrowEvent.key === 'ArrowDown' || arrowEvent.key === 'ArrowUp') && 
                  currentActive !== footerId && 
                  !currentActive?.startsWith('typeahead-footer-')) {
                footerButtonClickedRef.current = false
                input.removeEventListener('keydown', handleArrowAway, true)
              }
            }
            input.addEventListener('keydown', handleArrowAway, true)
            
            // Remove listener after menu closes
            // Store handleArrowAway reference so cleanup can access it
            const cleanup = (() => {
              const arrowAwayHandler = handleArrowAway
              const footerEnterHandler = handleFooterEnter
              return () => {
                try {
                  clearInterval(enforceInterval)
                  observer.disconnect()
                  // Clean up inline styles from all options
                  allOptions.forEach(opt => {
                    opt.style.removeProperty('background-color')
                  })
                  if (footerEnterHandler) {
                    input.removeEventListener('keydown', footerEnterHandler, true)
                  }
                  if (arrowAwayHandler) {
                    input.removeEventListener('keydown', arrowAwayHandler, true)
                  }
                  // Remove the blur listener if it exists
                  input.removeEventListener('blur', cleanup)
                } catch (error) {
                  // Ignore errors during cleanup
                }
              }
            })()
            
            // Store cleanup on input so we can call it when navigating away from footer
            ;(input as any).__footerCleanup = cleanup
            input.addEventListener('blur', cleanup, { once: true })
            
            return
          }
        }
      }

      // Handle ArrowUp: navigate to footer when on first option, or from footer to last option
      if (e.key === 'ArrowUp') {
        if (isFooterActive) {
          
          // Reset the footer button clicked flag since user is navigating away
          footerButtonClickedRef.current = false
          
          // Moving from footer to last option
          // Clean up footer enforcement (stops intervals and observers)
          cleanupFooterEnforcement()

          // Remove footer highlight and reset footer ID so it can be re-detected
          footerWrapper.classList.remove('typeahead-kit-select__option--is-focused')
          footerWrapper.removeAttribute('id')
          
          // Clean up inline styles from all options (but don't remove classes - let react-select handle that)
          allOptions.forEach(opt => {
            opt.style.removeProperty('background-color')
            opt.style.removeProperty('background')
          })
          
          // Reset aria-activedescendant to last option so react-select can navigate normally
          const lastOption = allOptions[allOptions.length - 1]
          const lastOptionId = lastOption.getAttribute('id')
          if (lastOptionId) {
            input.setAttribute('aria-activedescendant', lastOptionId)
            lastOption.classList.add('typeahead-kit-select__option--is-focused')
          }
          
          // Don't preventDefault - let react-select handle the navigation
          // This ensures react-select's internal state is properly updated
          return
        } else {
          // Check if we're on first option - navigate to footer
          const focusedOption = allOptions.find(opt => 
            opt.getAttribute('id') === activeDescendantId ||
            opt.classList.contains('typeahead-kit-select__option--is-focused')
          )

          const firstOption = allOptions[0]
          const isOnFirstOption = focusedOption === firstOption

          if (isOnFirstOption) {
            const footerButton = footerWrapper?.querySelector('button') as HTMLButtonElement
            
            if (footerButton) {
              e.preventDefault()
              e.stopPropagation()
              e.stopImmediatePropagation()
              
              // Ensure footer has ID and classes
              if (!footerWrapper.getAttribute('id')) {
                footerWrapper.setAttribute('id', `typeahead-footer-${Date.now()}`)
                footerWrapper.setAttribute('role', 'option')
                footerWrapper.classList.add('typeahead-kit-select__option')
              }
              
              const footerId = footerWrapper.getAttribute('id')
              if (!footerId) return
              
              // Remove background color from first option immediately (unless it's selected)
              if (firstOption && !firstOption.classList.contains('typeahead-kit-select__option--is-selected')) {
                firstOption.style.setProperty('background-color', 'transparent', 'important')
              }
              if (firstOption) {
                firstOption.classList.remove('typeahead-kit-select__option--is-focused')
              }
              
              // Set footer as active
              input.setAttribute('aria-activedescendant', footerId)
              footerWrapper.classList.add('typeahead-kit-select__option--is-focused')
              input.setAttribute('aria-expanded', 'true')
              
              // Aggressively enforce that first option background stays removed
              // Use both MutationObserver and setInterval to catch all cases
              const forceRemoveBackground = () => {
                if (!firstOption) return
                // Don't override background if the option is selected
                if (!firstOption.classList.contains('typeahead-kit-select__option--is-selected')) {
                  firstOption.style.setProperty('background-color', 'transparent', 'important')
                }
                firstOption.classList.remove('typeahead-kit-select__option--is-focused')
              }
              
              // Also use MutationObserver to catch when react-select adds the class or style back
              const observer = new MutationObserver((mutations) => {
                const currentActiveDescendantId = input.getAttribute('aria-activedescendant')
                if (currentActiveDescendantId === footerId) {
                  mutations.forEach(mutation => {
                    if (mutation.type === 'attributes') {
                      const target = mutation.target as HTMLElement
                      if (target === firstOption) {
                        // If react-select added the focused class back, remove it
                        if (target.classList.contains('typeahead-kit-select__option--is-focused')) {
                          forceRemoveBackground()
                        }
                        // If react-select set a background color, force it to transparent (unless selected)
                        if (!target.classList.contains('typeahead-kit-select__option--is-selected')) {
                          const bgColor = window.getComputedStyle(target).backgroundColor
                          if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                            forceRemoveBackground()
                          }
                        }
                      }
                    }
                  })
                }
              })
              
              observer.observe(firstOption, {
                attributes: true,
                attributeFilter: ['class', 'style']
              })
              
              // Continuously enforce that first option background stays removed
              // react-select will try to re-add the background, so we keep removing it
              const enforceInterval = setInterval(() => {
                const currentActiveDescendantId = input.getAttribute('aria-activedescendant')
                // Only enforce if footer is still active
                if (currentActiveDescendantId === footerId) {
                  forceRemoveBackground()
                } else {
                  // Footer is no longer active, stop enforcing
                  clearInterval(enforceInterval)
                  observer.disconnect()
                  // Clean up - remove the inline style
                  firstOption.style.removeProperty('background-color')
                }
              }, 10)
              
              // Handle Enter/Space on input to trigger footer button
              const handleFooterEnter = (enterEvent: KeyboardEvent) => {
                if (input.getAttribute('aria-activedescendant') === footerId && 
                    (enterEvent.key === 'Enter' || enterEvent.key === ' ')) {
                  enterEvent.preventDefault()
                  enterEvent.stopPropagation()
                  enterEvent.stopImmediatePropagation()
                  
                  // Find the onClick handler by traversing React Fiber
                  const reactFiberKey = Object.keys(footerButton).find(key => key.startsWith('__reactFiber'))
                  let onClickHandler: ((e: any) => void) | null = null
                  
                  if (reactFiberKey) {
                    const reactFiber = (footerButton as any)[reactFiberKey]
                    let fiber = reactFiber
                    
                    while (fiber) {
                      if (fiber.memoizedProps && fiber.memoizedProps.onClick) {
                        onClickHandler = fiber.memoizedProps.onClick
                        break
                      }
                      if (fiber.stateNode && fiber.stateNode.props && fiber.stateNode.props.onClick) {
                        onClickHandler = fiber.stateNode.props.onClick
                        break
                      }
                      if (fiber.child && fiber.child.memoizedProps && fiber.child.memoizedProps.onClick) {
                        onClickHandler = fiber.child.memoizedProps.onClick
                        break
                      }
                      fiber = fiber.return
                    }
                  }
                  
                  // Mark that we're clicking the footer button
                  footerButtonClickedRef.current = true
                  
                  // Call the handler directly without triggering a native click event
                  if (onClickHandler) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClickHandler({
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      preventDefault: () => {},
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                      stopPropagation: () => {},
                      currentTarget: footerButton,
                      target: footerButton
                    } as any)
                  } else {
                    // Fallback: click but immediately refocus input to keep menu open
                    footerButton.click()
                  }
                  
                  // Immediately refocus input and keep menu open after handler runs
                  setTimeout(() => {
                    input.focus()
                    input.setAttribute('aria-expanded', 'true')
                    if (footerId) {
                      input.setAttribute('aria-activedescendant', footerId)
                    }
                    footerWrapper.classList.add('typeahead-kit-select__option--is-focused')
                  }, 0)
                  
                  // Reset flag after handler completes (but keep it briefly for menu close prevention)
                  // The flag will be reset when user navigates away from footer or selects an option
                  setTimeout(() => {
                    // Only reset if still on footer (if user navigated away, onMenuClose will reset it)
                    const currentActiveDescendantId = input.getAttribute('aria-activedescendant')
                    if (currentActiveDescendantId === footerId) {
                      // Keep flag true for menu close prevention, but allow option selection
                      // The onMenuClose handler will check if we're still on footer
                    }
                  }, 100)
                }
              }
              
              input.addEventListener('keydown', handleFooterEnter, true)
              
              // Also reset flag when navigating away with arrow keys (for ArrowUp path)
              const handleArrowAwayUp = (arrowEvent: KeyboardEvent) => {
                const currentActive = input.getAttribute('aria-activedescendant')
                // If we navigated away from footer (not on footer anymore), reset the flag
                if ((arrowEvent.key === 'ArrowDown' || arrowEvent.key === 'ArrowUp') && 
                    currentActive !== footerId && 
                    !currentActive?.startsWith('typeahead-footer-')) {
                  footerButtonClickedRef.current = false
                  input.removeEventListener('keydown', handleArrowAwayUp, true)
                }
              }
              input.addEventListener('keydown', handleArrowAwayUp, true)
              
              // Remove listener after menu closes
              // Store handleArrowAwayUp reference so cleanup can access it
              const cleanup = (() => {
                const arrowAwayHandler = handleArrowAwayUp
                const footerEnterHandler = handleFooterEnter
                return () => {
                  try {
                    clearInterval(enforceInterval)
                    observer.disconnect()
                    // Clean up inline styles from all options
                    allOptions.forEach(opt => {
                      opt.style.removeProperty('background-color')
                    })
                    if (footerEnterHandler) {
                      input.removeEventListener('keydown', footerEnterHandler, true)
                    }
                    if (arrowAwayHandler) {
                      input.removeEventListener('keydown', arrowAwayHandler, true)
                    }
                    // Remove the blur listener if it exists
                    input.removeEventListener('blur', cleanup)
                  } catch (error) {
                    // Ignore errors during cleanup
                  }
                }
              })()
              
              // Store cleanup on input so we can call it when navigating away from footer
              ;(input as any).__footerCleanup = cleanup
              input.addEventListener('blur', cleanup, { once: true })
              
              return
            }
          }
        }
      }

      // Handle ArrowDown: navigate from footer to first option
      // This must run AFTER the "navigate to footer" check
      if (e.key === 'ArrowDown' && isFooterActive) {
        
        // Prevent react-select from handling this first
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        
        // Reset the footer button clicked flag since user is navigating away
        footerButtonClickedRef.current = false
        
        // Clean up footer enforcement (stops intervals and observers)
        cleanupFooterEnforcement()

        // Remove footer highlight
        if (footerWrapper) {
          footerWrapper.classList.remove('typeahead-kit-select__option--is-focused')
          // Remove footer ID immediately so it's not recognized as active
          footerWrapper.removeAttribute('id')
        }
        
        // FIRST: Clear ALL highlights from all options to ensure clean state
        allOptions.forEach(opt => {
          opt.classList.remove('typeahead-kit-select__option--is-focused')
          opt.style.removeProperty('background-color')
          opt.style.removeProperty('background')
        })
        
        // Set aria-activedescendant to first option
        const firstOption = allOptions[0]
        const firstOptionId = firstOption?.getAttribute('id')
        if (firstOptionId) {
          // Clear aria-activedescendant first to let react-select start fresh
          input.removeAttribute('aria-activedescendant')
          
          // Use requestAnimationFrame to let react-select process, then set our value
          requestAnimationFrame(() => {
            input.setAttribute('aria-activedescendant', firstOptionId)
            
            // Use react-select's internal state to navigate
            const selectInstance = selectRef.current
            if (selectInstance && selectInstance.setState) {
              // Get the option data from react-select
              const options = selectInstance.props?.options || []
              const optionData = options[0]
              if (optionData) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              selectInstance.setState((prevState: any) => ({
                ...prevState,
                focusedOption: optionData,
                focusedValue: null
              }))
              }
            }
          })
        } else {
          // Clear it so react-select can handle navigation
          input.removeAttribute('aria-activedescendant')
        }
        
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)
    ;(window as any).__typeaheadKeyDownListener = true
  }, [])

  const selectProps = {
    cacheOptions: true,
    required,
    components: {
      Control,
      ClearIndicator,
      IndicatorsContainer,
      IndicatorSeparator: null as null,
      MenuList,
      MultiValue,
      Option,
      Placeholder,
      ValueContainer,
      ...components
    },
    loadOptions: isString(loadOptions) ? get(window, loadOptions) : loadOptions,
    getOptionLabel: isString(getOptionLabel) ? get(window, getOptionLabel) : getOptionLabel,
    getOptionValue: isString(getOptionValue) ? get(window, getOptionValue) : getOptionValue,
    defaultOptions: true,
    id: id || uniqueId(),
    inline: false,
    isClearable: true,
    isSearchable: true,
    name,
    multiKit: '',
    onCreateOption: null as null,
    plusIcon: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMultiValueClick: (_option: SelectValueType): any => undefined,
    pillColor: pillColor,
    ...(preserveSearchInput ? { inputValue } : {}),
    onInputChange: handleInputChange,
    onBlur: handleBlur,
    onMenuOpen: handleMenuOpen,
    onMenuClose: () => {
      // Prevent menu from closing if we just clicked the footer button AND we're still on the footer
      if (footerButtonClickedRef.current) {
        const input = selectRef.current?.inputRef as HTMLInputElement | null
        if (input) {
          const activeDescendantId = input.getAttribute('aria-activedescendant')
          const menu = input.closest('.typeahead-kit-select__menu')
          const menuList = menu?.querySelector('.typeahead-kit-select__menu-list') as HTMLElement | null
          const footerWrapper = menuList?.querySelector('[data-footer-wrapper]') as HTMLElement | null
          let footerId = footerWrapper?.getAttribute('id')
          
          // Also check if activeDescendantId matches footer pattern
          if (!footerId && activeDescendantId && activeDescendantId.startsWith('typeahead-footer-')) {
            footerId = activeDescendantId
          }
          
          // Only prevent closing if we're still on the footer
          // If user navigated to a regular option, allow the menu to close normally
          const stillOnFooter = footerId && (
            activeDescendantId === footerId || 
            activeDescendantId?.startsWith('typeahead-footer-')
          )
          
          if (stillOnFooter) {
            // Force menu to stay open
            input.focus()
            input.setAttribute('aria-expanded', 'true')
            // Use react-select's internal state to keep menu open
            const selectInstance = selectRef.current
            if (selectInstance && selectInstance.setState) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              selectInstance.setState((prevState: any) => ({
                ...prevState,
                menuIsOpen: true
              }))
            }
            return // Prevent the menu from closing
          } else {
            // User navigated away from footer, reset flag and allow normal close
            footerButtonClickedRef.current = false
          }
        }
      }
      // Call original onMenuClose if provided
      if (props.onMenuClose) {
        return props.onMenuClose()
      }
    },
    ...props,
  }

  const [contextValue, setContextValue] = useState("")

  // Add listener for form validation to track when validation should be shown (needed for react rendered rails kit)
  useEffect(() => {
    const handleInvalid = (event: Event) => {
      const target = event.target as HTMLInputElement
      const typeaheadContainer = target.closest('[data-pb-react-component="Typeahead"]')

      if (typeaheadContainer) {
        // Check if this invalid event is specifically for our typeahead by comparing names so we do not have to require ids
        const invalidInputName = target.name || target.getAttribute('name')
        if (invalidInputName === name) {
          setFormSubmitted(true)
        }
      }
    }
    document.addEventListener('invalid', handleInvalid, true)
    
    return () => {
      document.removeEventListener('invalid', handleInvalid, true)
    }
  }, [name])

  // Add listener for clearing
  useEffect(() => {
    const handleClear = () => {
      if (preserveSearchInput) {
        setInputValue('')
      }
    }

    document.addEventListener(`pb-typeahead-kit-${selectProps.id}:clear`, handleClear)

    return () => {
      document.removeEventListener(`pb-typeahead-kit-${selectProps.id}:clear`, handleClear)
    }
  }, [selectProps.id, preserveSearchInput])

  useEffect(() => {
    if (searchContextSelector) {
      const searchContextElement = document.getElementById(searchContextSelector)

      setContextValue((searchContextElement as HTMLInputElement)?.value)
      const handleContextChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setContextValue(target.value);
        if (clearOnContextChange) {
          document.dispatchEvent(new CustomEvent(`pb-typeahead-kit-${selectProps.id}:clear`))
          if (preserveSearchInput) {
            setInputValue('')
          }
        }
      }

      if (searchContextElement) searchContextElement.addEventListener('change', handleContextChange)

      return () => {
        if (searchContextElement) searchContextElement.removeEventListener('change', handleContextChange)
      }
    }
  }, [searchContextSelector, clearOnContextChange, selectProps.id, preserveSearchInput])

  const contextArray = optionsByContext[contextValue]
  if (Array.isArray(contextArray) && contextArray.length > 0) {
    selectProps.options = contextArray
  }

  const Tag = (
    createable
      ? (async ? AsyncCreateableSelect : CreateableSelect)
      : (async ? AsyncSelect : Select)
  )

  const handleOnChange = (_data: SelectValueType, { action, option, removedValue }: TagOnChangeValues) => {
    if (onChange) {
      const isReactHookForm = onChange.toString().includes("target")
      if (isReactHookForm) {
        onChange({ target: { name, value: _data } })
      } else {
        onChange(_data)
      }
    }

    // Reset form submitted state when a selection is made (this is all for react rendered rails kit)
    if (action === 'select-option') {
      setFormSubmitted(false)
      // Mark that user has made a selection to disable default value focus behavior
      setHasUserSelected(true)
    }

    // If a value is selected and we're preserving input on blur, clear the input
    if (action === 'select-option' && preserveSearchInput) {
      setInputValue('')
    }

    if (action === 'select-option') {
      if (selectProps.onMultiValueClick && option) selectProps.onMultiValueClick(option)
      const multiValueClearEvent = new CustomEvent(`pb-typeahead-kit-${selectProps.id}-result-option-select`, { detail: option ? option : _data })
      document.dispatchEvent(multiValueClearEvent)
    }
    if (action === 'remove-value' || action === 'pop-value') {
      const multiValueRemoveEvent = new CustomEvent(`pb-typeahead-kit-${selectProps.id}-result-option-remove`, { detail: removedValue })
      document.dispatchEvent(multiValueRemoveEvent)
    }
    if (action === 'clear') {
      const multiValueClearEvent = new CustomEvent(`pb-typeahead-kit-${selectProps.id}-result-clear`)
      document.dispatchEvent(multiValueClearEvent)
      // If preserving input on blur, also clear input on explicit clear
      if (preserveSearchInput) {
        setInputValue('')
      }
    }
  }

  const filteredProps: TypeaheadProps = {...props}
  delete filteredProps.truncate

  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    'pb_typeahead_kit react-select',
    `mb_${marginBottom}`,
    globalProps(filteredProps),
    className
  )

  const inlineClass = selectProps.inline ? 'inline' : null

  const shouldShowValidationError = required && 
                                   formSubmitted

  const errorDisplay = error || (shouldShowValidationError ? validation?.message || "Please fill out this field." : "")

  return (
    <div
        {...dataProps}
        {...htmlProps}
        className={classnames(classes, inlineClass)}
    >
      <Tag
          classNamePrefix="typeahead-kit-select"
          error={errorDisplay}
          isDisabled={disabled}
          onChange={handleOnChange}
          ref={selectRef}
          {...selectProps}
      />
    </div>
  )
})

Object.keys(kitComponents).forEach((k) => {
  (Typeahead as GenericObject)[k] = (kitComponents as {[key: string]: unknown})[k]
})

Typeahead.displayName = 'Typeahead'
export default Typeahead
