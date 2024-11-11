// TimelineContext.ts
import React from 'react';

type TimelineContextType = {
  gap?: 'sm' | 'md' | 'lg';
};

export const TimelineContext = React.createContext<TimelineContextType>({
  gap: 'md',
});