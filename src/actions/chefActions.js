import recipeApi from '../api/recipeApi';
import * as types from './actionTypes';

export const loadChefsSuccess = (chefs) => {
  return { type: types.LOAD_CHEFS_SUCCESS, payload: chefs.data};
};

export const loadChefs = () => {
  return (dispatch) => {
    return recipeApi.getAllChefs().then(chefs=> {
      dispatch(loadChefsSuccess(chefs));
    }).catch(error=>{ throw(error); });
  };
};
