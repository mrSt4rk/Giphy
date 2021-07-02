import * as actions from './ActionsTypes';
import { SEARCH_API, API_KEY } from '../../config/config.js';
import axios from 'axios';

export const getGifs = (search) => async dispatch => {
    await dispatch({ type: actions.FETCH_GIFS, search });
    try {
        const result = await axios.get(SEARCH_API + `q=${search}&api_key=${API_KEY}&limit=10`);
        return dispatch({ type: actions.FETCH_GIFS_SUCCESS, data: result.data.data });
    } catch (error) {
        return dispatch({ type: actions.FETCH_GIFS_FAILURE, error });
    }
}