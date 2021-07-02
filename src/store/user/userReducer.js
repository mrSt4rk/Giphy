import * as actions from './userActionTypes';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, userLoggedIn: user } : {};

const User = (state = initialState, action) => {
    switch (action.type) {
        case actions.REGISTER_USER:
            return {
                ...state,
                loading: true,
                addUserStatus: false
            }
        case actions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userRegistered: action.data,
                addUserStatus: true
            }
        case actions.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actions.LOGIN_USER:
            return {
                ...state,
                loading: true
            }
        case actions.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                userLoggedIn: action.data
            }
        case actions.LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actions.GET_USER:
            return {
                ...state,
                loading: true
            }
        case actions.GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.data
            }
        case actions.GET_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actions.GET_USERS:
            return {
                ...state,
                loading: true
            }
        case actions.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.data
            }
        case actions.GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actions.DELETE_USER:
            return {
                ...state,
                loading: true,
                deleteUserStatus: false
            }
        case actions.DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                deleteUserStatus: true
            }
        case actions.DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actions.UPDATE_USER:
            return {
                ...state,
                loading: true,
                updateUserStatus: false
            }
        case actions.UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                updateUserStatus: true
            }
        case actions.UPDATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            }

        default:
            return state;
    }
}

export default User;