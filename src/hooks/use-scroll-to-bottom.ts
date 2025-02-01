import { useEffect, useRef, type RefObject } from "react";

export function useScrollToBottom<T extends HTMLElement>(
  isLoading: boolean,
): [RefObject<T>, RefObject<T>] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);
  const isLoadingRef = useRef(isLoading);

  // Aktualizuj ref przy każdej zmianie isLoading
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (container && end) {
      const observer = new MutationObserver(() => {
        // Scrolluj tylko jeśli isLoading jest true
        if (isLoadingRef.current) {
          end.scrollIntoView({
            behavior: "instant",
            block: "end",
          });
        }
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      return () => observer.disconnect();
    }
  }, []); // Empty dependency array = runs once on mount

  // @ts-expect-error aasdf
  return [containerRef, endRef];
}
