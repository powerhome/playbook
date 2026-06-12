import React, { useMemo } from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { Card, colors, Flex } from "playbook-ui";
import * as PB from "playbook-ui";
import maplibreglModule from "maplibre-gl";

interface PlaygroundPreviewProps {
  code: string;
  extraScope?: Record<string, any>;
}

const PlaygroundPreview: React.FC<PlaygroundPreviewProps> = ({ code, extraScope = {} }) => {
  // Rename Date to FormattedDate to avoid shadowing global Date
  const { Date: FormattedDate, ...PBrest } = PB as any;

  const scope = useMemo(() => ({
    React,
    useState: React.useState,
    useEffect: React.useEffect,
    useRef: React.useRef,
    useMemo: React.useMemo,
    useCallback: React.useCallback,
    Fragment: React.Fragment,
    ...PBrest,
    FormattedDate,
    maplibregl: (maplibreglModule as any).default || maplibreglModule,
    ...extraScope,
  }), [extraScope, PBrest, FormattedDate]);

  return (
    <LiveProvider code={code} scope={scope} noInline>
      <Card borderNone padding="md">
        <LivePreview />
      </Card>
      <Flex padding="sm">
        <LiveError style={{ color: colors.error, fontSize: "12px", margin: 0 }} />
      </Flex>
    </LiveProvider>
  );
};

export default PlaygroundPreview;
