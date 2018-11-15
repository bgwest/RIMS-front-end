const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'PART_SET':
      return payload;
    default:
      return state;
  }
}
