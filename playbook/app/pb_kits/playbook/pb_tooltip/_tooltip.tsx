import React, { useRef } from "react";
import classnames from 'classnames'
import { useState } from "react";
import {
  Placement,
  offset,
  arrow,
  shift,
  useFloating,
  useInteractions,
  useHover,
  flip,
  useDelayGroupContext,
} from "@floating-ui/react-dom-interactions";
import { GlobalProps, globalProps } from '../utilities/globalProps'

type TooltipProps = {
  text: string;
  placement?: Placement;
  children: JSX.Element;
  zIndex: Pick<GlobalProps, 'ZIndex'>;
} & GlobalProps;

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    text,
    placement = 'top',
    zIndex,
    ...rest
  } = props

  const css = classnames(
    globalProps(rest),
  )

  const { setCurrentId } = useDelayGroupContext();
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);
  const { 
      x, 
      y, 
      reference, 
      floating, 
      strategy, 
      context,
      middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
    } = useFloating({
      placement,
      open,
      onOpenChange(open) {
        setOpen(open);
        if (open) {
          setCurrentId(text);
        }
    },
    middleware: [
      offset(10),
      shift(),
      flip({
        fallbackPlacements: ['right', 'top', 'left'],
        fallbackStrategy: 'initialPlacement',
        flipAlignment: false
      }),
      arrow({ 
        element: arrowRef 
      })
    ],
  });

  const { getFloatingProps } = useInteractions([
    useHover(context),
  ]);

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement.split("-")[0]];

  return (
    <>
      <div 
        ref={reference} 
        className={`pb_tooltip_kit ${css}`} 
        style={{ display: "inline-flex" }}
        >
        {children}
      </div>
      {open && (
        <div
          {...getFloatingProps({
            ref: floating,
            className: "tooltip_tooltip show",
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              zIndex: zIndex ?? 0,
            }
          })}
        >
          {text}
          <div
            ref={arrowRef}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              background: '#fff',
              left: arrowX != null ? `${arrowX}px` : '',
              top: arrowY != null ? `${arrowY}px` : '',
              [staticSide]: '-5px',
              transform: 'rotate(45deg)',
            }}
          />
        </div>
      )}
    </>
  );
};

export default Tooltip