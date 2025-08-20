import { allSettled, fork } from 'effector';
import { Provider, useGate } from 'effector-react';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PortalDropdown } from '@/features/portal-dropdown';
import { EffectLogger } from '@/shared/lib/effect-logger';
import { getFavorites, addFavorites } from '@/shared/lib/utils/local-storage/favorites';
import { Book } from '@/shared/model/types/books';
import { Header } from '@/widgets/header/ui';

import { LangProvider, ThemeProvider } from './providers';
import { AppRouter } from './routers/app-router';
import { model } from '@/shared/model/favorites-model';

const rootScope = fork();

const overlayRoot = document.getElementById('overlay-root');

const App = () => {

  return (
    <Provider value={rootScope}>
      <AppContent />
    </Provider>
  );
};

const AppContent = () => {
  const handleToggleFavorite = (book: Book) => {
    allSettled(model.favoriteToggled, { scope: rootScope, params: book });
  };
  useGate(model.FavoritesGate);

  const [isLogging, setIsLogging] = useState(false);
  const [bookClicked, setBookClicked] = useState<Book | null>(null);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <div className="App">
            <Header isLogging={isLogging} setIsLogging={setIsLogging} />
          </div>

          <AppRouter setBookClicked={setBookClicked} />

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

          {overlayRoot && createPortal(<PortalDropdown />, overlayRoot)}
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};


export default App;
