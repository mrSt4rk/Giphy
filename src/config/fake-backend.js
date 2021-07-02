let users = JSON.parse(localStorage.getItem('users')) || [];
let singleUser = JSON.parse(localStorage.getItem('user')) || {};

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    let params = JSON.parse(opts.body);
                    let filteredUsers = users.filter(user => {
                        return user.userName === params.userName && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            userName: user.userName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            password: user.password,
                            token: 'fake-jwt-token'
                        };

                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {

                        reject('Username or password is incorrect');
                    }
                    return;
                }


                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else {

                        reject('Unauthorised');
                    }
                    return;
                }


                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {

                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;
                        user.token = 'fake-jwt-token';

                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(user)) });
                    } else {

                        reject('Unauthorised');
                    }

                    return;
                }


                if (url.endsWith('/users/register') && opts.method === 'POST') {

                    let newUser = JSON.parse(opts.body);
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    newUser.key = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    return;
                }


                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {

                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {

                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {

                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {

                        reject('Unauthorised');
                    }
                    return;
                }


                if (url.match(/\/users\/\d+$/) && opts.method === 'PUT') {
                    let updatedUser = JSON.parse(opts.body);
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {

                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                user.firstName = updatedUser.firstName;
                                user.lastName = updatedUser.lastName;
                                user.userName = updatedUser.userName;
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }
                        singleUser.firstName = updatedUser.firstName;
                        singleUser.lastName = updatedUser.lastName;
                        singleUser.userName = updatedUser.userName;
                        singleUser.id = updatedUser.id;
                        singleUser.token = updatedUser.token;

                        localStorage.setItem('user', JSON.stringify(singleUser));

                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(singleUser)) });
                    } else {

                        reject('Unauthorised');
                    }

                    return;
                }


                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}