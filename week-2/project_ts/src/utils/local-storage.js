
export function getFavourites() {
    try {
        const favouriteBooks = localStorage.getItem('favouriteBooks');
        return favouriteBooks ? JSON.parse(favouriteBooks) : [];
    }
    catch (err) {
        console.log('Error while getting favourite books ', err);
        return [];
    }
}

export function addFavourites(favourites) {
    try {
        localStorage.setItem('favouriteBooks', JSON.stringify(favourites));
    }
    catch (err) {
        console.error('Error while saving favourites to localStorage:', err);
        return [];
    }
}