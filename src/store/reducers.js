import { combineReducers } from "redux";
import Gifs from './gifs/reducer';
import User from './user/userReducer';

export const reducer = combineReducers({
    Gifs: Gifs,
    User: User
});

