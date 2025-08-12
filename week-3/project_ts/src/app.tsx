import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { EffectLogger } from '@/components/effect-logger';
import { BookDetails } from '@/pages/book-details';
import { Favorites } from '@/pages/favorites';
import { Home } from '@/pages/home';
import { Book } from '@/types/books';
import { getFavorites, addFavorites } from '@/utils/local-storage';

const App = () => {

  const [favorites, setFavorites] = useState<Book[]>(getFavorites());
  const [isLogging, setIsLogging] = useState(false);
  const [bookClicked, setBookClicked]= useState<Book | null>(null)

  useEffect(() => {
    addFavorites(favorites);
  }, [favorites]);
  

  return (
    <BrowserRouter>
      <div className='App'>
        <nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/favorites'}>Favorites</Link>
          <label>
            <input
              type="checkbox"
              checked={isLogging}
              onChange={(e) => setIsLogging(e.target.checked)}
            />
            {!isLogging ? 'Show Effect Logger' : 'Hide Effect Logger'}
          </label>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home favorites={favorites} setFavorites={setFavorites} setBookClicked={setBookClicked}/>} />
        <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} setBookClicked={setBookClicked}/>} />
        <Route path="/book/:bookId" element={<BookDetails favorites={favorites} setFavorites={setFavorites} />} />
      </Routes>
      {isLogging && <EffectLogger bookClicked={bookClicked}/>}
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
    </BrowserRouter>

  );
}

export default App;
