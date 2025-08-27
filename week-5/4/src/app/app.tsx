import { invoke } from '@withease/factories';
import { fork } from 'effector';
import { Provider, useUnit } from 'effector-react';
import React, { useMemo, useState, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { model } from '@/entities/book-card/model/book-model';
import { createBookModel } from '@/entities/book-card/model/book-model/factories';
import { ModalDropdown } from '@/features/modal-dropdown';
import { EffectLogger } from '@/shared/lib/effect-logger';
import { Spinner } from '@/shared/ui/atoms';
import { Header } from '@/widgets/header/ui';
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

  const [isLogging, setIsLogging] = useState(false);
  const bookModalModel = useMemo(() => invoke(createBookModel), []);
  const [isModalOpened, modalClosed, favoriteToggled] = useUnit([model.$isModalOpen, model.modalClosed, model.favoriteToggled]);


  return (
    <BrowserRouter>
      <ThemeProvider>
        <LangProvider>
          <div className="App">
            <Header isLogging={isLogging} setIsLogging={setIsLogging} />
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