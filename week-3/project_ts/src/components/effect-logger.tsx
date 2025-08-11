import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { Book } from "@/types/books";

interface EffectLoggerProps {
  bookClicked: Book | null
}

export function EffectLogger({ bookClicked }: EffectLoggerProps) {
  const [dependency, setDependency] = useState(false)


  console.log(' Render');

  useLayoutEffect(() => {
    console.log('useLayoutEffect no dependency');

    return () => {
      console.log('cleanup useLayoutEffect no dependency');
    };
  }, []);

  useEffect(() => {
    console.log('useEffect no dependency');

    return () => {
      console.log('cleanup useEffect no dependency');
    };
  }, []);

  useLayoutEffect(() => {
    console.log('useLayoutEffect with dependency');

    return () => {
      console.log('cleanup useLayoutEffect with dependency');
    };
  }, [dependency]);

  useEffect(() => {
    console.log('useEffect with dependency');

    return () => {
      console.log('cleanup useEffect with dependency');
    };
  }, [dependency]);

  useEffect(() => {
    if (bookClicked) {
        console.log('Props changed', bookClicked);
    }
    return () => {
      console.log('cleanup Props Changed');
    };
  }, [bookClicked]);

  return (
    <aside className="effect-logger-container">
      <strong>Effect Logger</strong>
      <label>
        <input
          type="checkbox"
          checked={dependency}
          onChange={(e) => setDependency(e.target.checked)}
        />
        Toggle Dependency
      </label>
    </aside>
  );
}