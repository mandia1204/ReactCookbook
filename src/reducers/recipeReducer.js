//returns a new state
import * as types from '../actions/actionTypes';

const recipeReducer = (state=[], action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_RECIPE_SUCCESS:
      return [
        ...state,
        Object.assign({}, payload)
      ];
    case types.UPDATE_RECIPE_SUCCESS:
        return [
          ...state.filter(recipe => recipe._id !== payload._id),
          Object.assign({}, payload)
        ];
    case types.LOAD_RECIPES_SUCCESS:
        return payload;
    case types.DELETE_RECIPE_SUCCESS:
      return state.filter(recipe => recipe._id!= payload);
    default:
      return state;
  }
};

export default recipeReducer;
