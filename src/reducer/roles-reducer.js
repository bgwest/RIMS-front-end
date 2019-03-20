const initialState = 'initialState';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ROLES_SET':
      return payload;
    default:
      return state;
  }
};
