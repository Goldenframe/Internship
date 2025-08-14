import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { EffectLogger } from '@/components/effect-logger';
import { Header } from '@/components/header';
import { Favorites } from '@/pages/favorites';
import { Home } from '@/pages/home';
import { Book } from '@/types/books';
import { getFavorites, addFavorites, getTheme, changeTheme, getLang, changeLang } from '@/utils/local-storage';

import { PortalDropdown } from './components/portal-dropdown';
import { LangContext } from './contexts/lang-context';
import { ThemeContext } from './contexts/theme-context';
import i18n from './i18n';
import { Language, Theme } from './types/contexts';

const overlayRoot = document.getElementById("overlay-root");

const App = () => {
  const [favorites, setFavorites] = useState<Book[]>(getFavorites());
  const [isLogging, setIsLogging] = useState(false);
  const [bookClicked, setBookClicked] = useState<Book | null>(null);
  const [theme, setTheme] = useState<Theme>(getTheme());
  const [lang, setLang] = useState<Language>(getLang());
  const [filter, setFilter] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    addFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    changeLang(lang);
  }, [lang]);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    changeTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log('Смена темы')
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const toggleLang = (lng: Language) => {
    const newLang = lng === 'en' ? 'ru' : 'en'
    i18n.changeLanguage(newLang);
    setLang(newLang);
  }


  return (
    <BrowserRouter>
      <LangContext.Provider value={{ lang, toggleLang }}>
        <ThemeContext.Provider value={{ toggleTheme }}>
          <div className='App'>

            <Header isLogging={isLogging} setIsLogging={setIsLogging} />

          </div>
          <Routes>
            <Route path="/" element={<Home favorites={favorites}
              setFavorites={setFavorites}
              setBookClicked={setBookClicked}
              filter={filter}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              hasMore={hasMore}
              setHasMore={setHasMore}
            />} />
            <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} setBookClicked={setBookClicked} />} />
          </Routes>
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
              <PortalDropdown
                filter={filter}
                setFilter={setFilter}
                setHasMore={setHasMore}
                setStartIndex={setStartIndex}
              />,
              overlayRoot
            )
          }

        </ThemeContext.Provider>
      </LangContext.Provider>
    </BrowserRouter >

  );
}

export default App;
