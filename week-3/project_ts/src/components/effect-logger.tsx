import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import { Book } from "@/types/books";

interface EffectLoggerProps {
  bookClicked: Book | null
}

export const EffectLogger = ({ bookClicked }: EffectLoggerProps) => {
  const [dependency, setDependency] = useState(false)


  console.log(' Render');

  useLayoutEffect(() => {
    console.log('1 useLayoutEffect no dependency');

    return () => {
      console.log('1 cleanup useLayoutEffect no dependency');
    };
  }, []);

  useEffect(() => {
    console.log('2 useEffect no dependency');

    return () => {
      console.log('2 cleanup useEffect no dependency');
    };
  }, []);

  useLayoutEffect(() => {
    console.log('3 useLayoutEffect with dependency');

    return () => {
      console.log('3 cleanup useLayoutEffect with dependency');
    };
  }, [dependency]);

  useEffect(() => {
    console.log('4 useEffect with dependency');

    return () => {
      console.log('4 cleanup useEffect with dependency');
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