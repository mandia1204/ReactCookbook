import * as types from '../actions/actionTypes';

const categoryReducer = (state=[], action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOAD_CATEGORIES_SUCCESS:
        return payload;
    default:
      return state;
  }
};

export default categoryReducer;
