import httpServise from './http-service';
import { host } from '../const/node-server-config';

export const profileAPI = {
    getProfile: (nickname) => {
        return new Promise((resolve, reject) => {
            httpServise.get(`${host}/profile/get-profile/${nickname}`).then(
                res => {
                    if (res.data.payload) {
                        resolve(res.data.payload);
                    } else reject({ status: 401 });
                }, err => reject(err)
            )
        })
    },

    updateProfile: (_id, fullName, nickname, website, bio, avatar) => {
        let updatedProfile = { fullName, nickname, website, bio, avatar };
        return new Promise((resolve, reject) => {
            httpServise.post(`${host}/profile/${_id}`, updatedProfile).then(
                res => {
                    if (res.data.payload) {
                        resolve(res.data.payload);
                    } else reject({ status: 404, error: 'No profile data returned on save' });
                }, err => reject(err)
            )
        })
    },

    userChangePassword: (_id, oldPassword, newPassword, newPasswordConf) => {
        let userChangePassword = { oldPassword, newPassword, newPasswordConf };
        return new Promise((resolve, reject) => {
            httpServise.post(`${host}/profile/change-password/${_id}`, userChangePassword).then(
                res => { resolve(res.data.payload) }, err => reject(err)
            )
        })
    }
}
