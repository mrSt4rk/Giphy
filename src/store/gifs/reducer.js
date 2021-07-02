import * as actions from './ActionsTypes';


const Gifs = (state = [], action) => {
    switch (action.type) {
        case actions.FETCH_GIFS:
            return {
                ...state,
                loading: true
            };

        case actions.FETCH_GIFS_SUCCESS:
            return {
                ...state,
                loading: false,
                gifsResult: action.data,
                error: false
            };

        case actions.FETCH_GIFS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.error,
                error: true
            };

        default:
            return state;

    }
}

export default Gifs;