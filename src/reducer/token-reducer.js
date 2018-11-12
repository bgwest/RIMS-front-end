const initialState = null;

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
