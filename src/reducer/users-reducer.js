const initialState = false;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'USER_LIST_SET':
      return payload;
    default:
      return state;
  }
};
