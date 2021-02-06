import httpServise from './http-service';
import { host } from '../const/node-server-config';

export const authApi = {
    signIn: (email, password) => {
        return new Promise((resolve, reject) => {
            httpServise.post(`${host}/login`, {email: email, password: password}).then(
                res => {
                    if (res.data.user) {
                        window.localStorage.setItem('authHeaders', JSON.stringify({ 'accessToken': res.data.accessToken}));
                        resolve(res.data.user);
                    } else reject({status: 401});
                }, err => reject(err)
            );
        });
    },

    signInSocial: (user) => {
        return new Promise((resolve, reject) => {
            httpServise.post(`${host}/login/social`, {user}).then(
                res => {
                    if (res.data.user) {
                        window.localStorage.setItem('authHeaders', JSON.stringify({ 'accessToken': res.data.accessToken}));
                        resolve(res.data.user);
                    } else reject({status: 401});
                }, err => reject(err)
            );
        });
    },

    checkUser: () => {
        return new Promise((resolve, reject) => {
            httpServise.get(`${host}/validate-token`).then(
                res => {
                    if (res.data.user) {
                        resolve(res.data.user);
                    } else {
                        window.localStorage.removeItem('authHeaders');
                        reject({status: 401});
                    }
                }, err => {
                    window.localStorage.removeItem('authHeaders');
                    reject(err);
                }
            );
        });
    },

    signOut: () => {
        return new Promise ((resolve, reject) => {
            httpServise.get(`${host}/logout`, null).then(
                res => {
                    window.localStorage.removeItem('authHeaders');
                    resolve(res);
                },
                ( ) => {
                    window.localStorage.removeItem('authHeaders');
                    resolve( );
                }
            )
        })
    },

    signUp: (nickname, email, password, passwordConf) => {
        const newUser = { nickname, email, password, passwordConf };
        return new Promise ((resolve, reject) => {
            httpServise.post(`${host}/register`, newUser).then(
                res => {
                    if (res.data.text) {
                        resolve(res.data.text);
                    } else reject({status: 401});
                }, err => reject(err)
            )
        })
    },

    verifyEmail: (hash) => {
        return new Promise ((resolve, reject) => {
            httpServise.get(`${host}/verify/${hash}`).then(
                res => {
                    if (res.data.user) {
                        resolve(res.data.user);
                    } else reject({status: 401});
                }, err => reject(err)
            )
        })
    },

    forgotEmail: (email) => {
        return new Promise ((resolve, reject) => {
            httpServise.post(`${host}/forgot`, {email: email}).then(
                res => {
                    if (res.data.text) {
                        resolve(res.data.text);
                    } else reject({status: 401});
                }, err => reject(err)
            )
        })
    },

    VerifyPasswordResetToken: (reset) => {
        return new Promise ((resolve, reject) => {
            httpServise.get(`${host}/change/${reset}`).then(
                res => {
                    if (res.data.text) {
                        resolve(res.data.text);
                    } else reject({status: 401});
                }, err => reject(err)
            )
        })
    },

    ChangePassword: (password, passwordConf, resetToken) =>{
        return new Promise ((resolve, reject) => {
            httpServise.post(`${host}/change`, {password: password, passwordConf: passwordConf, resetToken: resetToken}).then(
                res => {
                    if (res.data.text) {
                        resolve(res.data.text);
                    } else reject({status: 401});
                }, err => reject(err)
            )
        })
    }
}
