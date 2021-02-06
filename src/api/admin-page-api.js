import httpServise from './http-service';
import { host } from '../const/node-server-config';

export const dashboardAPI = {
  getUsers: () => {
    return new Promise ((resolve, reject) => {
      httpServise.get(`${host}/dashboard`).then(
        res => { 
          resolve(res);
        }, 
        err => reject(err)
      )
    })
  },

  updateUserStatus: (id, status) => {
    return new Promise ((resolve, reject) => {
      const payload = {id, status}
      httpServise.patch(`${host}/dashboard`, payload).then(
        res => {
          resolve(res);
        },  
        err => reject(err)
      )
    })
  },

  disableUser: (IDs) => {
    return new Promise ((resolve, reject) => {
      const payload = {IDs}
      httpServise.patch(`${host}/dashboard/disable`, payload).then(
        res => {
          resolve(res);
        },  
        err => reject(err)
      )
    })
  }
}
