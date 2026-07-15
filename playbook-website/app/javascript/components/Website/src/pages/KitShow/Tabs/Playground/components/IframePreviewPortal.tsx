import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDarkMode } from "../../../../../contexts/DarkModeContext";

type IframePreviewPortalProps = {
  children: React.ReactNode;
  /** When true, iframe fills the parent height instead of shrinking to content. */
  fillHeight?: boolean;
  title?: string;
};

const copyDocumentStyles = (targetDocument: Document) => {
  targetDocument.head.innerHTML = "";

  document
    .querySelectorAll('link[rel="stylesheet"], style')
    .forEach((node) => {
      targetDocument.head.appendChild(node.cloneNode(true));
    });
};

export const IframePreviewPortal: React.FC<IframePreviewPortalProps> = ({
  children,
  fillHeight = false,
  title = "Responsive preview",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const initializeFrame = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      copyDocumentStyles(doc);
      doc.documentElement.classList.toggle("dark", darkMode);
      doc.body.style.margin = "0";
      doc.body.style.boxSizing = "border-box";
      doc.body.style.background = "transparent";
      if (fillHeight) {
        doc.documentElement.style.height = "100%";
        doc.body.style.height = "100%";
        doc.body.style.minHeight = "100%";
        doc.body.style.overflow = "auto";
      }
      setMountNode(doc.body);
    };

    iframe.addEventListener("load", initializeFrame);
    iframe.srcdoc =
      "<!DOCTYPE html><html><head></head><body></body></html>";

    return () => {
      iframe.removeEventListener("load", initializeFrame);
      setMountNode(null);
    };
  }, [darkMode, fillHeight]);

  useEffect(() => {
    if (!mountNode || !iframeRef.current) return;

    if (fillHeight) {
      iframeRef.current.style.height = "100%";
      return;
    }

    const resizeFrame = () => {
      if (!iframeRef.current || !mountNode) return;
      iframeRef.current.style.height = `${mountNode.scrollHeight}px`;
    };

    resizeFrame();

    const observer = new ResizeObserver(resizeFrame);
    observer.observe(mountNode);

    return () => observer.disconnect();
  }, [mountNode, children, fillHeight]);

  return (
    <div className="responsive-preview__iframe-host">
      <iframe
        className="responsive-preview__iframe"
        ref={iframeRef}
        title={title}
      />
      {mountNode ? createPortal(children, mountNode) : null}
    </div>
  );
};
