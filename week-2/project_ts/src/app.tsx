import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import BookDetails from './pages/book-details';
import Favourites from './pages/favourites';
import Home from './pages/home';
import { Book } from './types/books';
import { getFavourites, addFavourites  } from './utils/local-storage'

function App() {

  const [favourites, setFavourites] = useState<Book[]>(getFavourites());

  useEffect(() => {
    addFavourites(favourites);
  }, [favourites]);

  return (
    <BrowserRouter>
      <div className='App'>
        <nav>
          <Link to={'/'}>Home</Link>
          <Link to={'/favourites'}>Favourites</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home favourites={favourites} setFavourites={setFavourites} />} />
        <Route path="/favourites" element={<Favourites favourites={favourites} setFavourites={setFavourites} />} />
        <Route path="/book/:bookId" element={<BookDetails favourites={favourites} setFavourites={setFavourites} />} />
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
