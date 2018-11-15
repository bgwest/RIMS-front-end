const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SUB_ASSY_SET':
      return payload;
    default:
      return state;
  }
};
