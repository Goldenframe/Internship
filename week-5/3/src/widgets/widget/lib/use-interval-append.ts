import { useEffect, RefObject } from "react";

interface UseIntervalAppendProps {
  targetRef: RefObject<HTMLElement | null>;
  isActive: boolean;
  createElement: () => HTMLElement;
  intervalMs?: number; 
}

export const useIntervalAppend = ({
  targetRef,
  isActive,
  createElement,
  intervalMs = 2000,
}: UseIntervalAppendProps) => {
  useEffect(() => {
    if (!targetRef.current) return;

    const interval = setInterval(() => {
      if (isActive && targetRef.current) {
        const el = createElement();
        targetRef.current.appendChild(el);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [targetRef, isActive, createElement, intervalMs]);
};
