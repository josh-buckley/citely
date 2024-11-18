'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DndProviderWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export const DndProviderWrapper: React.FC<DndProviderWrapperProps> = ({ className, children }) => {
  const context = useRef<HTMLDivElement>(null);
  const [dndArea, setDndArea] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setDndArea(context?.current);
  }, [context]);

  const html5Options = useMemo(() => ({ rootElement: dndArea }), [dndArea]);

  return (
    <div className={className} ref={context}>
      {dndArea && (
        <DndProvider backend={HTML5Backend} options={html5Options}>
          {children}
        </DndProvider>
      )}
    </div>
  );
};
