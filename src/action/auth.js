import superagent from 'superagent';
import * as routes from '../routes';

export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const remove = () => ({
  type: 'TOKEN_REMOVE',
});

export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_BACKEND}`)
    .send(user)
    .then((response) => {
      const bareToken = JSON.parse(response.text).token;
      // TOM - expire is a variable that holds the date at the time the token is created
      const expire = new Date();
      expire.setHours(expire.getHours() + 4);
      document.cookie = `rims-cookie=${bareToken}`;
      document.cookie = `expires=${expire.toUTCString()};`;
      return store.dispatch(tokenSet(response.text));
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_BACKEND}`)
    .auth(user.username, user.password)
    .then((response) => {
      const bareToken = response.body.token;
      const expire = new Date();
      expire.setHours(expire.getHours() + 4);
      document.cookie = `rims-cookie=${bareToken}`;
      document.cookie = `expires=${expire.toUTCString()};`;
      // set isAdmin to determine menu availability and dbQueries etc
      return store.dispatch(tokenSet([{ token: response.body.token, isAdmin: response.body.isAdmin }]));
    });
};
