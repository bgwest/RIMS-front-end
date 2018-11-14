import superagent from 'superagent';
import * as routes from '../routes';

export const set = users => ({
  type: 'USER_LIST_SET',
  payload: users,
});

export const getUsers = users => (store) => {
  console.log('before superagent');
  console.log('users');
  console.log(users);
  return superagent.get(`${API_URL}${routes.ACCOUNTS_BACKEND }`)
      .then((userData) => {
        console.log('after super agent');
        userData = JSON.parse(userData.text);
        return store.dispatch(set(userData.dbQuery[0]));
      })
};
