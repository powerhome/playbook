import React, { useState } from "react";
import { Body, Button, Caption, Flex, Title } from "playbook-ui";

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
    try {
      const url = await onShare();
      await navigator.clipboard.writeText(url);
      setShareCopyState(true);
      setTimeout(() => setShareCopyState(false), 2000);
    } catch (err) {
      console.error("Failed to copy playground share link:", err);
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
