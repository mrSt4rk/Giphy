import * as actions from './userActionTypes';
import { register, login, getUserById, getAll, deleteUserById, updateUserById } from '../services/User/user.service';
import { message } from 'antd';

export const registerUser = (payload) => async dispatch => {
    await dispatch({ type: actions.REGISTER_USER, payload });
    try {
        register(payload).then(result => {
            message.success('User Was Created Successfully');
            return dispatch({ type: actions.REGISTER_USER_SUCCESS, data: payload });
        });

    } catch (error) {
        return dispatch({ type: actions.REGISTER_USER_FAILURE, error });
    }
}

export const loginUser = (payload) => async dispatch => {
    await dispatch({ type: actions.LOGIN_USER, payload });
    try {
        login(payload).then(result => {
            result.key = result.id;
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(result));
            return dispatch({ type: actions.LOGIN_USER_SUCCESS, data: result });
        });
    } catch (error) {
        return dispatch({ type: actions.LOGIN_USER_FAILURE, error });
    }
}

export const getUser = (id) => async dispatch => {
    await dispatch({ type: actions.GET_USER, id });
    try {
        getUserById(id).then(result => {
            return dispatch({ type: actions.GET_USER_SUCCESS, data: result });
        });

    } catch (error) {
        return dispatch({ type: actions.GET_USER_FAILURE, error });
    }
}

export const getUsers = () => async dispatch => {
    await dispatch({ type: actions.GET_USERS });
    try {
        getAll().then(result => {
            return dispatch({ type: actions.GET_USERS_SUCCESS, data: result });
        });
    } catch (error) {
        return dispatch({ type: actions.GET_USERS_FAILURE, error });
    }
}

export const deleteUser = (id) => async dispatch => {
    await dispatch({ type: actions.DELETE_USER, id });
    try {
        deleteUserById(id).then(result => {
            return dispatch({ type: actions.DELETE_USER_SUCCESS, data: result });
        });

    } catch (error) {
        return dispatch({ type: actions.DELETE_USER_FAILURE, error });
    }
}

export const updateUser = (payload) => async dispatch => {
    await dispatch({ type: actions.UPDATE_USER, payload });
    try {
        updateUserById(payload).then(result => {
            return dispatch({ type: actions.UPDATE_USER_SUCCESS, data: result });
        });

    } catch (error) {
        return dispatch({ type: actions.UPDATE_USER_FAILURE, error });
    }
}


