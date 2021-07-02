export const FETCH_GIFS = 'FETCH_GIFS';
export const FETCH_GIFS_SUCCESS = 'FETCH_GIFS_SUCCESS';
export const FETCH_GIFS_FAILURE = 'FETCH_GIFS_FAILURE';

export const getGifs = (search) => ({
    type: FETCH_GIFS,
    search
});