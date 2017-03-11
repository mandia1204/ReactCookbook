import * as types from './actionTypes';
//import recipeApi from '../api/mockRecipeApi';
import recipeApi from '../api/recipeApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export const loadRecipesSuccess = (recipes) => {
  return { type: types.LOAD_RECIPES_SUCCESS, payload: recipes.data};
};

export const createRecipeSuccess = (recipe) => {
  return {type: types.CREATE_RECIPE_SUCCESS, payload: recipe.data};
};

export const updateRecipeSuccess = (recipe) => {
  return {type: types.UPDATE_RECIPE_SUCCESS, payload: recipe.data};
};

export const deleteRecipeSuccess = (recipeId) => {
  return {type: types.DELETE_RECIPE_SUCCESS, payload: recipeId};
};

export const loadRecipes = () => {
  return (dispatch) => {
    return recipeApi.getAllRecipes().then(recipes=> {
      dispatch(loadRecipesSuccess(recipes));
    }).catch(error=>
      {
        throw(error);
      });
  };
};

export const saveRecipe = (recipe) => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return recipeApi.saveRecipe(recipe).then(savedRecipe => {
      recipe._id ? dispatch(updateRecipeSuccess(savedRecipe)) : dispatch(createRecipeSuccess(savedRecipe));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
};

export const deleteRecipe =(recipeId) => {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return recipeApi.deleteRecipe(recipeId).then(()=>{
      dispatch(deleteRecipeSuccess(recipeId));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
};
