// handle using token post refresh
function findMeTheToken(strToFind) {
  const cookies = document.cookie.split('; ');
  let flySorterToken = null;
  let prop = null;
  let key = null;
  for (let i = 0; i <= cookies.length - 1; i++) {
    console.log(cookies[i]);
    if (cookies[i].includes(strToFind)) {
      flySorterToken = cookies[i];
    }
  }
  if (flySorterToken !== null) {
    prop = flySorterToken.split('=')[0];
    key = flySorterToken.split('=')[1];
  }
  return key;
}

const initialState = findMeTheToken('flysorter-cookie');

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      // Token was being asssigned as the DOM in a string...
      // Below if handles if API_URL is missing to prevent auto login.
      if (payload.includes('<\!DOCTYPE html>')) {
        return null;
      } // else
      return payload;
    case 'TOKEN_REMOVE':
      return initialState;
    default:
      return state;
  }
};
