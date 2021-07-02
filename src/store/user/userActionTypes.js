export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';


export const loginUser = (payload) => ({
    type: LOGIN_USER,
    payload,
});

export const registerUser = (payload) => ({
    type: REGISTER_USER,
    payload
})

export const getUser = (id) => ({
    type: GET_USER,
    id
})

export const getUsers = () => ({
    type: GET_USERS
})

export const deleteUser = (id) => ({
    type: DELETE_USER,
    id
})

export const updateUser = (payload) => ({
    type: UPDATE_USER,
    payload
})