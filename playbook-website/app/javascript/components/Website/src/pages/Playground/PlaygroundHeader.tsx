import React, { useState } from "react";
import { Body, Button, Caption, Flex, Title } from "playbook-ui";

// This workspace's TypeScript (4.3.5) predates ClipboardItem in the bundled
// DOM lib types, so declare it ourselves rather than bumping the shared
// tsconfig `lib` target (see the same pattern in playgroundShareLink.ts).
declare const ClipboardItem: any;

type ShareLoadStatus = "loaded" | "invalid" | null;

type PlaygroundHeaderProps = {
  canRedo: boolean;
  canRestorePreviousState: boolean;
  disableShare: boolean;
  kitCount: number;
  onClear: () => void;
  onRedo: () => void;
  onRestorePreviousState: () => void;
  onShare: () => Promise<string>;
  shareStatus: ShareLoadStatus;
};

export const PlaygroundHeader = ({
  canRedo,
  canRestorePreviousState,
  disableShare,
  kitCount,
  onClear,
  onRedo,
  onRestorePreviousState,
  onShare,
  shareStatus,
}: PlaygroundHeaderProps) => {
  const [shareCopyState, setShareCopyState] = useState(false);

  const handleShareClick = async () => {
    // onShare() awaits gzip compression before resolving, so awaiting it
    // here first — then calling clipboard.writeText — puts the actual write
    // outside the click's transient user-activation window. Browsers that
    // enforce that (notably Safari) then reject the write. Calling
    // clipboard.write() synchronously, with a ClipboardItem whose value is
    // still a pending promise, keeps the write itself inside the gesture —
    // the browser waits for the promise before committing the copy.
    const urlPromise = onShare();

    try {
      if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": urlPromise.then(
              (url) => new Blob([url], { type: "text/plain" }),
            ),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(await urlPromise);
      }

      setShareCopyState(true);
      setTimeout(() => setShareCopyState(false), 2000);
    } catch (err) {
      console.error("Failed to copy playground share link:", err);

      // Clipboard access can fail for reasons unrelated to the URL itself
      // (permissions, insecure context, browser quirks) — fall back to a
      // native prompt so the link is still recoverable instead of silently
      // disappearing into the console.
      const url = await urlPromise.catch(() => null);
      if (url) window.prompt("Copy this link to share your playground:", url);
    }
  };

  return (
    <Flex
        align="end"
        className="full-playground-heading"
        gap="md"
        justify="between"
        width="100%"
    >
      <Flex
          gap="xs"
          orientation="column"
      >
        <Caption
            color="lighter"
            text={`${kitCount} configured playground kits`}
        />
        <Title
            size={1}
            text="Playground"
        />
        <Body
            color="light"
            text="Build a UI by adding kits to the canvas, nesting kits inside children, and editing props. Use Share to send a live link to a teammate, or copy the produced code snippet in the Code section."
        />
        {shareStatus && (
          <Caption
              color={shareStatus === "loaded" ? "success" : "error"}
              text={
              shareStatus === "loaded"
                ? "Loaded playground from a shared link."
                : "That shared link couldn't be loaded — it may be corrupted or use kits that are no longer available."
            }
          />
        )}
      </Flex>
      <Flex
          gap="xs"
          orientation="column"
      >
        <Flex gap="xs">
          <Button
              disabled={disableShare}
              icon="link"
              onClick={handleShareClick}
              text={shareCopyState ? "Link copied!" : "Share"}
              variant="primary"
          />
          <Button
              disabled={!canRestorePreviousState}
              icon="undo"
              onClick={onRestorePreviousState}
              text="Undo"
              variant="secondary"
          />
          <Button
              disabled={!canRedo}
              icon="redo"
              onClick={onRedo}
              text="Redo"
              variant="secondary"
          />
          <Button
              icon="trash"
              onClick={onClear}
              text="Clear"
              variant="secondary"
          />
        </Flex>
        <Caption
            color="lighter"
            text="Autosaved in this browser as you work"
        />
      </Flex>
    </Flex>
  );
};
