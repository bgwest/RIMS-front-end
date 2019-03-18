import superagent from 'superagent';
import * as routes from '../routes';

export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const remove = () => ({
  type: 'TOKEN_REMOVE',
});

function updateCookie(token) {
  const expire = new Date();
  expire.setHours(expire.getHours() + 4);
  document.cookie = `rims-cookie=${token}; expires=${expire.toUTCString()};`;
  return document.cookie;
}

export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_BACKEND}`)
    .send(user)
    .then((response) => {
      const returnObject = {};
      returnObject.token = response.body.token;
      returnObject.username = response.body.username;
      returnObject.recoveryQuestion = response.body.recoveryQuestion;
      returnObject.isAdmin = response.body.isAdmin;
      returnObject.accountType = response.body.accountType;
      updateCookie(returnObject.token);
      return store.dispatch(tokenSet([{
        token: returnObject.token,
        username: returnObject.username,
        recoveryQuestion: returnObject.recoveryQuestion,
        isAdmin: returnObject.isAdmin,
        accountType: returnObject.accountType,
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
      returnObject.accountType = response.body.accountType;
      updateCookie(returnObject.token);
      return store.dispatch(tokenSet([{
        token: returnObject.token,
        username: returnObject.username,
        recoveryQuestion: returnObject.recoveryQuestion,
        isAdmin: returnObject.isAdmin,
        accountType: returnObject.accountType,
      }]));
    })
    .catch((error) => {
      console.log('loginRequest action error:');
      console.log(error.response);
      return error.response;
    });
};

export const handlePwResetAndLogin = user => (store) => {
  let { currentPassword, newPassword } = user;
  // super agent auth will automatically base64 encode
  // run base64 encoding for additional second field for pw reset
  newPassword = Buffer.from(newPassword).toString('base64');
  return superagent.get(`${API_URL}${routes.GET_PW_RESET_BACKEND}`)
    .set('Basic2', newPassword)
    .auth(user.username, currentPassword)
    .then((response) => {
      // erase pw variables
      currentPassword = null;
      newPassword = null;
      const returnObject = {};
      returnObject.token = response.body.token;
      returnObject.username = response.body.username;
      returnObject.recoveryQuestion = response.body.recoveryQuestion;
      returnObject.isAdmin = response.body.isAdmin;
      returnObject.accountType = response.body.accountType;
      updateCookie(returnObject.token);
    })
    .catch((error) => {
      console.log('handlePwResetAndLogin action error:');
      console.log(error.response);
      return error.response;
    });
};

export const handleForgotMyPassword = user => (store) => {
  console.log(user);
  // encode recoveryAnswer for sending as request obj
  user.recoveryAnswer = Buffer.from(user.recoveryAnswer).toString('base64');
  return superagent.post(`${API_URL}${routes.FORGOT_PW_BACKEND}`)
    .send(user)
    .then((recieved) => {
      const dataRecieved = JSON.parse(recieved.text);
      // receive new temp pw from back-end and decode
      dataRecieved.temporaryPassword = Buffer.from(dataRecieved.temporaryPassword, 'base64').toString();
      // Data now being properly received, and needs to be returned to landing method
      // handleForgotMyPassword() for rendering on screen for user
      return dataRecieved.temporaryPassword;
    })
    .catch((error) => {
      return error.response;
    });
};

// handle using token post refresh
function findMeTheToken(strToFind) {
  const cookies = document.cookie.split(';');
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
      returnObject.accountType = response.body.accountType;
      updateCookie(returnObject.token);
      return store.dispatch(tokenSet([{
        token: returnObject.token,
        username: returnObject.username,
        recoveryQuestion: returnObject.recoveryQuestion,
        isAdmin: returnObject.isAdmin,
        accountType: returnObject.accountType,
      }]));
    })
    .catch((error) => {
      console.log('tokenRefreshOrReject action error:');
      console.log(error.response);
      return error.response;
    });
};
