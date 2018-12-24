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
  return key;
}

const initialState = findMeTheToken('rims-cookie');

export default (state = initialState, { type, payload }) => {
  console.log('token payload');
  console.log(payload);
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
