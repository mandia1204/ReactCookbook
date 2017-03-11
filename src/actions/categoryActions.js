import recipeApi from '../api/recipeApi';
import * as types from './actionTypes';

export const loadCategoriesSuccess = (categories) => {
  return { type: types.LOAD_CATEGORIES_SUCCESS, payload: categories.data};
};

export const loadCategories = () => {
  return (dispatch) => {
    return recipeApi.getAllCategories().then(categories=> {
      dispatch(loadCategoriesSuccess(categories));
    }).catch(error=>{ throw(error); });
  };
};
