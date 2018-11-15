import superagent from 'superagent';
import React from 'react';
import * as routes from '../routes';

export const set = users => ({
  type: 'USER_LIST_SET',
  payload: users,
});

export const getUsers = users => (store) => {
  return superagent.get(`${API_URL}${routes.ACCOUNTS_BACKEND}`)
    .then((userData) => {
      userData = JSON.parse(userData.text);
      return userData.dbQuery.map((eachUser) => {
        if (eachUser.username !== 'admin') {
          return eachUser;
        } // else if admin...
        return {
          _id: '!prohibited',
          isAdmin: '!prohibited',
          recoveryQuestion: '!prohibited',
          username: '!prohibited', 
        };
      });
    }).then((finalMap) => {
      console.log('finalmap');
      console.log(finalMap);
      return store.dispatch(set(finalMap));
    }).catch(console.error);
};
