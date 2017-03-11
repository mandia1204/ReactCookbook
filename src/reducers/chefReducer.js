import * as types from '../actions/actionTypes';

const chefReducer = (state=[], action) => {
  const { type, payload } = action;
  switch (type) {
    case types.LOAD_CHEFS_SUCCESS:
        return payload;
    default:
      return state;
  }
};

export default chefReducer;
