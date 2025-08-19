import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PortalDropdown } from '@/features/portal-dropdown';
import { EffectLogger } from '@/shared/lib/effect-logger';
import { getFavorites, addFavorites } from '@/shared/lib/utils/local-storage/favorites';
import { Book } from '@/shared/model/types/books';
import { Header } from '@/widgets/header/ui';

import { LangProvider, ThemeProvider } from './providers';
import { AppRouter } from './routers/app-router';

const overlayRoot = document.getElementById("overlay-root");

const App = () => {
  const [favorites, setFavorites] = useState<Book[]>(getFavorites());
  const [isLogging, setIsLogging] = useState(false);
  const [bookClicked, setBookClicked] = useState<Book | null>(null);

  useEffect(() => {
    addFavorites(favorites);
  }, [favorites]);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <div className='App'>
            <Header isLogging={isLogging} setIsLogging={setIsLogging} />
          </div>
          <AppRouter
            favorites={favorites}
            setFavorites={setFavorites}
            setBookClicked={setBookClicked}
          />

          {isLogging && <EffectLogger bookClicked={bookClicked} />}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {overlayRoot &&
            createPortal(
              <PortalDropdown />,
              overlayRoot
            )
          }
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
export default App;
