import { invoke } from '@withease/factories';
import { fork } from 'effector';
import { Provider, useGate, useUnit } from 'effector-react';
import React, { useMemo, useState, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { model } from '@/entities/book-card/model/book-model';
import { createBookModel } from '@/entities/book-card/model/book-model/factories';
import { ModalDropdown } from '@/features/modal-dropdown';
import { EffectLogger } from '@/shared/lib/effect-logger';
import { useCrossTabFavoritesSync } from '@/shared/lib/hooks/use-cross-tab-favorites-sync';
import { Book } from '@/shared/model/types/books';
import { Spinner } from '@/shared/ui/atoms';
import { Header } from '@/widgets/header/ui';
import { ViewedBooksCounter } from '@/widgets/viewed-books-counter';

import { LangProvider, ThemeProvider } from './providers';
import { AppRouter } from './routers/app-router';
const ModalBooksDetails = React.lazy(() =>
  import("@/features/modal-book-details/ui").then(async module => {
    await model.loadModalWithDelayFx();
    return { default: module.ModalBooksDetails };
  })
);

const modalRoot = document.getElementById("modal-root");

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


  useCrossTabFavoritesSync<Book>({ channelName: "favorites", onMessage: (data) => { favoriteToggled(data) } });
  const { t } = useTranslation();
  const [isLogging, setIsLogging] = useState(false);
  const bookModalModel = useMemo(() => invoke(createBookModel), []);
  const [isModalOpened, modalClosed, favoriteToggled, sessionFavoriteToggled] = useUnit([model.$isModalOpen, model.modalClosed, model.favoriteToggled, model.sessionFavoriteToggled]);
  useGate(model.AppGate, { t });


  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <div className="App">
            <Header isLogging={isLogging} setIsLogging={setIsLogging} />
            <ViewedBooksCounter />
          </div>

          <AppRouter />

          {isLogging && <EffectLogger />}

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

          {overlayRoot && createPortal(<ModalDropdown />, overlayRoot)}
          {isModalOpened && modalRoot && createPortal(
            <Suspense fallback={<Spinner />}>
              <ModalBooksDetails
                bookModel={bookModalModel}
                modalClosed={modalClosed}
                favoriteToggled={favoriteToggled}
                sessionFavoriteToggled={sessionFavoriteToggled}
              />
            </Suspense>,
            modalRoot
          )}
        </LangProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;