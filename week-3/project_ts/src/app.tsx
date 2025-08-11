import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { BookDetails } from '@/pages/book-details';
import { Favorites } from '@/pages/favorites';
import { Home } from '@/pages/home';
import { Book } from '@/types/books';
import { getFavorites, addFavorites } from '@/utils/local-storage';

function App() {

  const [favorites, setFavorites] = useState<Book[]>(getFavorites());

  useEffect(() => {
    addFavorites(favorites);
  }, [favorites]);

  return (
    <BrowserRouter>
      <div className='App'>
        <nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/favorites'}>favorites</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/book/:bookId" element={<BookDetails favorites={favorites} setFavorites={setFavorites} />} />
      </Routes>
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
