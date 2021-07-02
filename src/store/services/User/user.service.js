
import { message } from 'antd';
import { USER_API } from '../../../config/config.js';

const authHeader = () => {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export const register = (userData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };
    return fetch(`${USER_API}/users/register`, requestOptions).then(handleResponse).catch(error => {
        message.error(error)
    });

}

export const login = (userData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    return fetch(`${USER_API}/users/authenticate`, requestOptions).then(handleResponse);
}

export const getUserById = (id) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${USER_API}/users/${id}`, requestOptions).then(handleResponse).catch(error => {
        message.error(error)
    });
}

export const getAll = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${USER_API}/users`, requestOptions).then(handleResponse).catch(error => {
        message.error(error)
    });;
}

export const deleteUserById = (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${USER_API}/users/${id}`, requestOptions).then(handleResponse).catch(error => {
        message.error(error)
    });;
}

export const updateUserById = (user) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${USER_API}/users/${user.id}`, requestOptions).then(handleResponse).catch(error => {
        message.error(error)
    });;
}

export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
}

const handleResponse = (response) => {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.href = '/login';
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}