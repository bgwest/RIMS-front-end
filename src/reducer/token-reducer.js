import superagent from 'superagent';
import * as routes from '../routes';

function reValidateUser(token) {
  return superagent.get(`${API_URL}${routes.TOKEN_AUTH_BACKEND}`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .then((response) => {
      const returnObject = {};
      returnObject.token = response.body.token;
      returnObject.isAdmin = response.body.isAdmin;
      const expire = new Date();
      expire.setHours(expire.getHours() + 4);
      document.cookie = `rims-cookie=${returnObject.token}`;
      document.cookie = `expires=${expire.toUTCString()};`;
      return returnObject;
    })
    .catch(console.error);
}

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
  return key ? reValidateUser(key) : null;
}

const initialState = findMeTheToken('rims-cookie');
// const token = findMeTheToken('rims-cookie');
// const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      // Token was being assigned as the DOM in a string...
      // Below if handles if API_URL is missing to prevent auto login.
      if (payload.includes('<\!DOCTYPE html>')) { // eslint-disable-line no-useless-escape
        return null;
      } // else
      return payload;
    case 'TOKEN_REMOVE':
      return initialState;
    default:
      return state;
  }
};
