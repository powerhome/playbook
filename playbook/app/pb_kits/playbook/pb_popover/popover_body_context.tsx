import { createContext, RefObject, useContext } from "react";

export type PopoverBodyContextValue = {
  bodyRef: RefObject<HTMLDivElement | null>;
  scrollRef: RefObject<HTMLDivElement | null>;
};

export const PopoverBodyContext = createContext<PopoverBodyContextValue | null>(
  null
);

export const usePopoverBodyContext = () => useContext(PopoverBodyContext);
