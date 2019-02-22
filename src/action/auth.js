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
      const returnObject = {};
      returnObject.token = response.body.token;
      returnObject.username = response.body.username;
      returnObject.recoveryQuestion = response.body.recoveryQuestion;
      returnObject.isAdmin = response.body.isAdmin;
      const expire = new Date();
      expire.setHours(expire.getHours() + 4);
      document.cookie = `rims-cookie=${returnObject.token}`;
      document.cookie = `expires=${expire.toUTCString()};`;
      return store.dispatch(tokenSet([{
        token: returnObject.token,
        username: returnObject.username,
        recoveryQuestion: returnObject.recoveryQuestion,
        isAdmin: returnObject.isAdmin,
      }]));
    })
    .catch((error) => {
      console.log('signupRequest action error:');
      console.log(error.response);
      return error.response;
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_BACKEND}`)
    .auth(user.username, user.password)
    .then((response) => {
      const returnObject = {};
      returnObject.token = response.body.token;
      returnObject.username = response.body.username;
      returnObject.recoveryQuestion = response.body.recoveryQuestion;
      returnObject.isAdmin = response.body.isAdmin;
      const expire = new Date();
      expire.setHours(expire.getHours() + 4);
      document.cookie = `rims-cookie=${returnObject.token}`;
      document.cookie = `expires=${expire.toUTCString()};`;
      return store.dispatch(tokenSet([{
        token: returnObject.token,
        username: returnObject.username,
        recoveryQuestion: returnObject.recoveryQuestion,
        isAdmin: returnObject.isAdmin,
      }]));
    })
    .catch((error) => {
      console.log('loginRequest action error:');
      console.log(error.response);
      return error.response;
    });
};

export const handlePwResetAndLogin = user => (store) => {
  return superagent.get(`${API_URL}${routes.GET_PW_RESET_BACKEND}`)
    .field('newPassword', user.newPassword)
    .auth(user.username, user.password)
    .then((response) => {
      const returnObject = {};
      returnObject.token = response.body.token;
      returnObject.username = response.body.username;
      returnObject.recoveryQuestion = response.body.recoveryQuestion;
      returnObject.isAdmin = response.body.isAdmin;
      const expire = new Date();
      expire.setHours(expire.getHours() + 4);
      document.cookie = `rims-cookie=${returnObject.token}`;
      document.cookie = `expires=${expire.toUTCString()};`;
    })
    .catch((error) => {
      console.log('handlePwResetAndLogin action error:');
      console.log(error.response);
      return error.response;
    });
};

// handle using token post refresh
function findMeTheToken(strToFind) {
  const cookies = document.cookie.split('; ');
  let rimsToken = null;
  let prop = null; // eslint-disable-line no-unused-vars
  let key = null;
  for (let i = 0; i <= cookies.length - 1; i++) {
    if (cookies[i].includes(strToFind)) {
      rimsToken = cookies[i];
    }
  }
  if (rimsToken !== null) {
    prop = rimsToken.split('=')[0]; // eslint-disable-line prefer-destructuring
    key = rimsToken.split('=')[1]; // eslint-disable-line prefer-destructuring
  }
  return key || null;
}

export const tokenRefreshOrReject = user => (store) => {
  const token = findMeTheToken('rims-cookie');
  return superagent.get(`${API_URL}${routes.TOKEN_AUTH_BACKEND}`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .then((response) => {
      const returnObject = {};
      returnObject.token = response.body.token;
      returnObject.username = response.body.username;
      returnObject.recoveryQuestion = response.body.recoveryQuestion;
      returnObject.isAdmin = response.body.isAdmin;
      const expire = new Date();
      expire.setHours(expire.getHours() + 4);
      document.cookie = `rims-cookie=${returnObject.token}`;
      document.cookie = `expires=${expire.toUTCString()};`;
      return store.dispatch(tokenSet([{
        token: returnObject.token,
        username: returnObject.username,
        recoveryQuestion: returnObject.recoveryQuestion,
        isAdmin: returnObject.isAdmin,
      }]));
    })
    .catch((error) => {
      console.log('tokenRefreshOrReject action error:');
      console.log(error.response);
      return error.response;
    });
};
