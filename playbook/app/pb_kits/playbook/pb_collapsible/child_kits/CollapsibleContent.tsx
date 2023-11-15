import classnames from "classnames"
import React, { useContext, useRef, useEffect } from "react"
import { buildCss } from "../../utilities/props"
import { globalProps } from "../../utilities/globalProps"
import { hideElement, showElement } from "../_helper_functions"

import CollapsibleContext from "../context"

export type CollapsibleContentProps = {
  children?: React.ReactNode[] | React.ReactNode | string
  className?: string
}

const CollapsibleContent = ({
  children,
  className,
  ...props
}: CollapsibleContentProps) => {
  const context: { [key: string]: boolean | string } =
    useContext(CollapsibleContext)
  const contentCSS = buildCss("pb_collapsible_content_kit")
  const contentSpacing = globalProps(props)
  const contentRef = useRef(null)

  useEffect(() => {
    // Use the showElement and hideElement functions based on the context value
    if (contentRef.current) {
      if (context.collapsed) {
        hideElement(contentRef.current)
      } else {
        showElement(contentRef.current)
      }
    }
  }, [context.collapsed])

  return (
    <div
      ref={contentRef}
      data-collapsible-content="true"
      className={classnames(
        contentCSS,
        contentSpacing,
        "toggle-content",
        className
      )}
    >
      {children}
    </div>
  )
}

export default CollapsibleContent
